import Database from "better-sqlite3";
import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";
import * as schema from "./schema";
import { seedRecipes } from "./seed";

type DbStore = {
  sqlite?: Database.Database;
  drizzle?: BetterSQLite3Database<typeof schema>;
};

const store = globalThis as typeof globalThis & { familyMenuDb?: DbStore };

function ensureColumn(sqlite: Database.Database, table: string, column: string, definition: string) {
  const columns = sqlite.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
  if (!columns.some((item) => item.name === column)) sqlite.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
}

function inferAllergens(recipe: (typeof seedRecipes)[number]) {
  const source = recipe.ingredients.map((item) => item.name).join("、");
  const matches: [RegExp, string][] = [
    [/蛋/, "蛋类"], [/奶|酸奶|芝士|奶酪/, "乳制品"], [/豆腐|豆浆|黄豆|豆乳/, "大豆"],
    [/花生/, "花生"], [/虾|蟹/, "甲壳类"], [/鱼|三文鱼|鲈鱼/, "鱼类"], [/面|麦/, "含麸质谷物"],
  ];
  return matches.filter(([pattern]) => pattern.test(source)).map(([, label]) => label);
}

function initialize(sqlite: Database.Database) {
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      emoji TEXT NOT NULL,
      color_from TEXT NOT NULL,
      color_to TEXT NOT NULL,
      cook_time INTEGER NOT NULL,
      difficulty TEXT NOT NULL,
      flavor TEXT NOT NULL,
      servings INTEGER NOT NULL DEFAULT 2,
      featured INTEGER NOT NULL DEFAULT 0,
      life_stage TEXT NOT NULL DEFAULT 'family',
      sub_stage TEXT NOT NULL DEFAULT '全家共享',
      meal_type TEXT NOT NULL DEFAULT '午晚餐',
      nutrition_highlights TEXT NOT NULL DEFAULT '[]',
      allergens TEXT NOT NULL DEFAULT '[]',
      safety_note TEXT NOT NULL DEFAULT '',
      min_age_months INTEGER,
      texture TEXT NOT NULL DEFAULT '正常质地',
      spice_level TEXT NOT NULL DEFAULT 'none'
    );
    CREATE TABLE IF NOT EXISTS ingredients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipe_id TEXT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      amount TEXT NOT NULL,
      sort_order INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS steps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipe_id TEXT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
      instruction TEXT NOT NULL,
      duration TEXT,
      tip TEXT,
      sort_order INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ordered_by TEXT NOT NULL DEFAULT '老婆',
      status TEXT NOT NULL DEFAULT 'pending',
      servings INTEGER NOT NULL DEFAULT 2,
      note TEXT NOT NULL DEFAULT '',
      requested_for TEXT NOT NULL DEFAULT '尽快',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      recipe_id TEXT NOT NULL REFERENCES recipes(id),
      quantity INTEGER NOT NULL DEFAULT 1
    );
    CREATE INDEX IF NOT EXISTS idx_ingredients_recipe ON ingredients(recipe_id, sort_order);
    CREATE INDEX IF NOT EXISTS idx_steps_recipe ON steps(recipe_id, sort_order);
    CREATE INDEX IF NOT EXISTS idx_orders_status_created ON orders(status, created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
  `);

  ensureColumn(sqlite, "recipes", "life_stage", "TEXT NOT NULL DEFAULT 'family'");
  ensureColumn(sqlite, "recipes", "sub_stage", "TEXT NOT NULL DEFAULT '全家共享'");
  ensureColumn(sqlite, "recipes", "meal_type", "TEXT NOT NULL DEFAULT '午晚餐'");
  ensureColumn(sqlite, "recipes", "nutrition_highlights", "TEXT NOT NULL DEFAULT '[]'");
  ensureColumn(sqlite, "recipes", "allergens", "TEXT NOT NULL DEFAULT '[]'");
  ensureColumn(sqlite, "recipes", "safety_note", "TEXT NOT NULL DEFAULT ''");
  ensureColumn(sqlite, "recipes", "min_age_months", "INTEGER");
  ensureColumn(sqlite, "recipes", "texture", "TEXT NOT NULL DEFAULT '正常质地'");
  ensureColumn(sqlite, "recipes", "spice_level", "TEXT NOT NULL DEFAULT 'none'");

  const hasRecipe = sqlite.prepare("SELECT 1 FROM recipes WHERE id = ?");
  const addRecipe = sqlite.prepare(`
    INSERT OR IGNORE INTO recipes (
      id, name, category, description, emoji, color_from, color_to, cook_time, difficulty, flavor, servings, featured,
      life_stage, sub_stage, meal_type, nutrition_highlights, allergens, safety_note, min_age_months, texture, spice_level
    ) VALUES (
      @id, @name, @category, @description, @emoji, @colorFrom, @colorTo, @cookTime, @difficulty, @flavor, @servings, @featured,
      @lifeStage, @subStage, @mealType, @nutritionHighlights, @allergens, @safetyNote, @minAgeMonths, @texture, @spiceLevel
    )
  `);
  const updateMetadata = sqlite.prepare(`
    UPDATE recipes SET life_stage = @lifeStage, sub_stage = @subStage, meal_type = @mealType,
      nutrition_highlights = @nutritionHighlights, allergens = @allergens, safety_note = @safetyNote,
      min_age_months = @minAgeMonths, texture = @texture, spice_level = @spiceLevel WHERE id = @id
  `);
  const addIngredient = sqlite.prepare("INSERT INTO ingredients (recipe_id, name, amount, sort_order) VALUES (?, ?, ?, ?)");
  const addStep = sqlite.prepare("INSERT INTO steps (recipe_id, instruction, duration, tip, sort_order) VALUES (?, ?, ?, ?, ?)");
  sqlite.transaction(() => {
    for (const recipe of seedRecipes) {
      const existed = Boolean(hasRecipe.get(recipe.id));
      const metadata = {
        ...recipe,
        featured: recipe.featured ? 1 : 0,
        lifeStage: recipe.lifeStage ?? "family",
        subStage: recipe.subStage ?? "全家共享",
        mealType: recipe.mealType ?? "午晚餐",
        nutritionHighlights: JSON.stringify(recipe.nutritionHighlights ?? ["家常搭配"]),
        allergens: JSON.stringify(recipe.allergens ?? inferAllergens(recipe)),
        safetyNote: recipe.safetyNote ?? "按需调整盐和油，肉、蛋、水产等食材彻底加热后食用。",
        minAgeMonths: recipe.minAgeMonths ?? null,
        texture: recipe.texture ?? "正常质地",
        spiceLevel: recipe.spiceLevel ?? "none",
      };
      addRecipe.run(metadata);
      updateMetadata.run(metadata);
      if (!existed) {
        recipe.ingredients.forEach((item, index) => addIngredient.run(recipe.id, item.name, item.amount, index));
        recipe.steps.forEach((item, index) => addStep.run(recipe.id, item.instruction, item.duration ?? null, item.tip ?? null, index));
      }
    }
  })();
  sqlite.pragma("optimize");
}

export function getSqlite(): Database.Database {
  if (!store.familyMenuDb?.sqlite) {
    const databasePath = process.env.DATABASE_PATH ?? path.join(process.cwd(), "data", "family-menu.db");
    mkdirSync(path.dirname(databasePath), { recursive: true });
    const sqlite = new Database(databasePath);
    initialize(sqlite);
    store.familyMenuDb = { sqlite, drizzle: drizzle(sqlite, { schema }) };
  }
  return store.familyMenuDb.sqlite!;
}

export function getDb() {
  getSqlite();
  return store.familyMenuDb!.drizzle!;
}
