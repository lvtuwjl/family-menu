import { listRecipes } from "@/lib/data";

export const runtime = "nodejs";

export function GET() {
  return Response.json({ recipes: listRecipes() });
}
