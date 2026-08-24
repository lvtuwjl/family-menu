import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const recipes = sqliteTable("recipes", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  emoji: text("emoji").notNull(),
  colorFrom: text("color_from").notNull(),
  colorTo: text("color_to").notNull(),
  cookTime: integer("cook_time").notNull(),
  difficulty: text("difficulty").notNull(),
  flavor: text("flavor").notNull(),
  servings: integer("servings").notNull().default(2),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  lifeStage: text("life_stage").notNull().default("family"),
  subStage: text("sub_stage").notNull().default("全家共享"),
  mealType: text("meal_type").notNull().default("午晚餐"),
  nutritionHighlights: text("nutrition_highlights").notNull().default("[]"),
  allergens: text("allergens").notNull().default("[]"),
  safetyNote: text("safety_note").notNull().default(""),
  minAgeMonths: integer("min_age_months"),
  texture: text("texture").notNull().default("正常质地"),
  spiceLevel: text("spice_level").notNull().default("none"),
});

export const ingredients = sqliteTable("ingredients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  recipeId: text("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  amount: text("amount").notNull(),
  sortOrder: integer("sort_order").notNull(),
});

export const steps = sqliteTable("steps", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  recipeId: text("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
  instruction: text("instruction").notNull(),
  duration: text("duration"),
  tip: text("tip"),
  sortOrder: integer("sort_order").notNull(),
});

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderedBy: text("ordered_by").notNull().default("老婆"),
  status: text("status").notNull().default("pending"),
  servings: integer("servings").notNull().default(2),
  note: text("note").notNull().default(""),
  requestedFor: text("requested_for").notNull().default("尽快"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const orderItems = sqliteTable("order_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: integer("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  recipeId: text("recipe_id").notNull().references(() => recipes.id),
  quantity: integer("quantity").notNull().default(1),
});
