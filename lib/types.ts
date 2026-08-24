export type Ingredient = { name: string; amount: string };
export type RecipeStep = { instruction: string; duration?: string | null; tip?: string | null };
export type LifeStage = "preconception" | "pregnancy" | "postpartum" | "baby" | "family";
export type SpiceLevel = "none" | "mild" | "medium" | "hot";

export type Recipe = {
  id: string;
  name: string;
  category: string;
  description: string;
  emoji: string;
  colorFrom: string;
  colorTo: string;
  cookTime: number;
  difficulty: string;
  flavor: string;
  servings: number;
  featured: boolean;
  lifeStage: LifeStage;
  subStage: string;
  mealType: string;
  nutritionHighlights: string[];
  allergens: string[];
  safetyNote: string;
  minAgeMonths: number | null;
  texture: string;
  spiceLevel: SpiceLevel;
  ingredients: Ingredient[];
  steps: RecipeStep[];
};

export type OrderStatus = "pending" | "accepted" | "shopping" | "cooking" | "ready" | "done";

export type FamilyOrder = {
  id: number;
  orderedBy: string;
  status: OrderStatus;
  servings: number;
  note: string;
  requestedFor: string;
  createdAt: string;
  updatedAt: string;
  items: { recipeId: string; name: string; emoji: string; quantity: number }[];
};
