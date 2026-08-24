import { asc, desc } from "drizzle-orm";
import { getDb, getSqlite } from "@/db";
import { ingredients, recipes, steps } from "@/db/schema";
import type { FamilyOrder, LifeStage, OrderStatus, Recipe, SpiceLevel } from "./types";

function parseStringList(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function listRecipes(): Recipe[] {
  const db = getDb();
  const recipeRows = db.select().from(recipes).orderBy(desc(recipes.featured), asc(recipes.name)).all();
  const ingredientRows = db.select().from(ingredients).orderBy(asc(ingredients.sortOrder)).all();
  const stepRows = db.select().from(steps).orderBy(asc(steps.sortOrder)).all();

  return recipeRows.map((recipe) => ({
    ...recipe,
    featured: Boolean(recipe.featured),
    lifeStage: recipe.lifeStage as LifeStage,
    spiceLevel: recipe.spiceLevel as SpiceLevel,
    nutritionHighlights: parseStringList(recipe.nutritionHighlights),
    allergens: parseStringList(recipe.allergens),
    ingredients: ingredientRows
      .filter((item) => item.recipeId === recipe.id)
      .map(({ name, amount }) => ({ name, amount })),
    steps: stepRows
      .filter((item) => item.recipeId === recipe.id)
      .map(({ instruction, duration, tip }) => ({ instruction, duration, tip })),
  }));
}

type OrderRow = {
  id: number;
  orderedBy: string;
  status: string;
  servings: number;
  note: string;
  requestedFor: string;
  createdAt: string;
  updatedAt: string;
};

export function listOrders(): FamilyOrder[] {
  const sqlite = getSqlite();
  const orderRows = sqlite.prepare(`
    SELECT id, ordered_by AS orderedBy, status, servings, note,
      requested_for AS requestedFor, created_at AS createdAt, updated_at AS updatedAt
    FROM orders ORDER BY id DESC LIMIT 30
  `).all() as OrderRow[];
  const itemQuery = sqlite.prepare(`
    SELECT oi.recipe_id AS recipeId, r.name, r.emoji, oi.quantity
    FROM order_items oi JOIN recipes r ON r.id = oi.recipe_id
    WHERE oi.order_id = ? ORDER BY oi.id
  `);
  return orderRows.map((order) => ({
    ...order,
    status: order.status as OrderStatus,
    items: itemQuery.all(order.id) as FamilyOrder["items"],
  }));
}

export function createOrder(input: {
  items: { recipeId: string; quantity: number }[];
  servings: number;
  note: string;
  requestedFor: string;
}) {
  const sqlite = getSqlite();
  const validIds = new Set((sqlite.prepare("SELECT id FROM recipes").all() as { id: string }[]).map((row) => row.id));
  const cleanItems = input.items.filter((item) => validIds.has(item.recipeId) && item.quantity > 0);
  if (cleanItems.length === 0) throw new Error("请至少选择一道菜");
  const now = new Date().toISOString();
  const insertOrder = sqlite.prepare(`
    INSERT INTO orders (ordered_by, status, servings, note, requested_for, created_at, updated_at)
    VALUES ('老婆', 'pending', ?, ?, ?, ?, ?)
  `);
  const insertItem = sqlite.prepare("INSERT INTO order_items (order_id, recipe_id, quantity) VALUES (?, ?, ?)");
  sqlite.transaction(() => {
    const result = insertOrder.run(Math.max(1, Math.min(12, input.servings)), input.note.slice(0, 200), input.requestedFor.slice(0, 30), now, now);
    cleanItems.forEach((item) => insertItem.run(Number(result.lastInsertRowid), item.recipeId, Math.min(9, item.quantity)));
  })();
  return listOrders()[0];
}

export function updateOrderStatus(id: number, status: OrderStatus) {
  const allowed: OrderStatus[] = ["pending", "accepted", "shopping", "cooking", "ready", "done"];
  if (!allowed.includes(status)) throw new Error("无效的订单状态");
  const result = getSqlite().prepare("UPDATE orders SET status = ?, updated_at = ? WHERE id = ?").run(status, new Date().toISOString(), id);
  if (result.changes === 0) throw new Error("没有找到这张订单");
  return listOrders().find((order) => order.id === id)!;
}
