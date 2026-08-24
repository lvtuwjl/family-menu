import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { seedRecipes } from "../db/seed";

const databasePath = path.join(process.cwd(), "data", "family-menu.db");
const backupPath = path.join(process.cwd(), "data", "family-menu-v0.1-backup-20260824.db");

function sqlite(args: string[], input?: string) {
  const result = spawnSync("sqlite3", args, { input, encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr || "sqlite3 failed");
  return result.stdout;
}

function value(input: unknown): string {
  if (input === null || input === undefined) return "NULL";
  if (typeof input === "number") return String(input);
  return `'${String(input).replaceAll("'", "''")}'`;
}

function inferAllergens(recipe: (typeof seedRecipes)[number]) {
  const source = recipe.ingredients.map((item) => item.name).join("、");
  const matches: [RegExp, string][] = [
    [/蛋/, "蛋类"], [/奶|酸奶|芝士|奶酪/, "乳制品"], [/豆腐|豆浆|黄豆|豆乳/, "大豆"],
    [/花生/, "花生"], [/虾|蟹/, "甲壳类"], [/鱼|三文鱼|鲈鱼/, "鱼类"], [/面|麦/, "含麸质谷物"],
  ];
  return matches.filter(([pattern]) => pattern.test(source)).map(([, label]) => label);
}

if (!existsSync(backupPath)) sqlite([databasePath, `.backup '${backupPath}'`]);

const columns = JSON.parse(sqlite(["-json", databasePath, "PRAGMA table_info(recipes);"]) || "[]") as { name: string }[];
const columnNames = new Set(columns.map((item) => item.name));
const additions: [string, string][] = [
  ["life_stage", "TEXT NOT NULL DEFAULT 'family'"],
  ["sub_stage", "TEXT NOT NULL DEFAULT '全家共享'"],
  ["meal_type", "TEXT NOT NULL DEFAULT '午晚餐'"],
  ["nutrition_highlights", "TEXT NOT NULL DEFAULT '[]'"],
  ["allergens", "TEXT NOT NULL DEFAULT '[]'"],
  ["safety_note", "TEXT NOT NULL DEFAULT ''"],
  ["min_age_months", "INTEGER"],
  ["texture", "TEXT NOT NULL DEFAULT '正常质地'"],
  ["spice_level", "TEXT NOT NULL DEFAULT 'none'"],
];
for (const [name, definition] of additions) {
  if (!columnNames.has(name)) sqlite([databasePath, `ALTER TABLE recipes ADD COLUMN ${name} ${definition};`]);
}

const existing = new Set((JSON.parse(sqlite(["-json", databasePath, "SELECT id FROM recipes;"]) || "[]") as { id: string }[]).map((item) => item.id));
const statements = ["PRAGMA foreign_keys = ON;", "BEGIN IMMEDIATE;"];

for (const recipe of seedRecipes) {
  const lifeStage = recipe.lifeStage ?? "family";
  const subStage = recipe.subStage ?? "全家共享";
  const mealType = recipe.mealType ?? "午晚餐";
  const nutritionHighlights = JSON.stringify(recipe.nutritionHighlights ?? ["家常搭配"]);
  const allergens = JSON.stringify(recipe.allergens ?? inferAllergens(recipe));
  const safetyNote = recipe.safetyNote ?? "按需调整盐和油，肉、蛋、水产等食材彻底加热后食用。";
  const minAgeMonths = recipe.minAgeMonths ?? null;
  const texture = recipe.texture ?? "正常质地";
  const spiceLevel = recipe.spiceLevel ?? "none";
  statements.push(`INSERT OR IGNORE INTO recipes (id,name,category,description,emoji,color_from,color_to,cook_time,difficulty,flavor,servings,featured,life_stage,sub_stage,meal_type,nutrition_highlights,allergens,safety_note,min_age_months,texture,spice_level) VALUES (${[
    recipe.id, recipe.name, recipe.category, recipe.description, recipe.emoji, recipe.colorFrom, recipe.colorTo,
    recipe.cookTime, recipe.difficulty, recipe.flavor, recipe.servings, recipe.featured ? 1 : 0, lifeStage, subStage,
    mealType, nutritionHighlights, allergens, safetyNote, minAgeMonths, texture, spiceLevel,
  ].map(value).join(",")});`);
  statements.push(`UPDATE recipes SET life_stage=${value(lifeStage)},sub_stage=${value(subStage)},meal_type=${value(mealType)},nutrition_highlights=${value(nutritionHighlights)},allergens=${value(allergens)},safety_note=${value(safetyNote)},min_age_months=${value(minAgeMonths)},texture=${value(texture)},spice_level=${value(spiceLevel)} WHERE id=${value(recipe.id)};`);
  if (!existing.has(recipe.id)) {
    recipe.ingredients.forEach((item, index) => statements.push(`INSERT INTO ingredients (recipe_id,name,amount,sort_order) VALUES (${value(recipe.id)},${value(item.name)},${value(item.amount)},${index});`));
    recipe.steps.forEach((item, index) => statements.push(`INSERT INTO steps (recipe_id,instruction,duration,tip,sort_order) VALUES (${value(recipe.id)},${value(item.instruction)},${value(item.duration)},${value(item.tip)},${index});`));
  }
}

statements.push("COMMIT;", "PRAGMA optimize;");
sqlite([databasePath], statements.join("\n"));
console.log(sqlite(["-json", databasePath, "SELECT life_stage AS stage, COUNT(*) AS count FROM recipes GROUP BY life_stage ORDER BY life_stage;"]));
