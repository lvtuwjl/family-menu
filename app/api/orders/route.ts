import { createOrder, listOrders } from "@/lib/data";

export const runtime = "nodejs";

export function GET() {
  return Response.json({ orders: listOrders() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = createOrder({
      items: Array.isArray(body.items) ? body.items : [],
      servings: Number(body.servings) || 2,
      note: typeof body.note === "string" ? body.note : "",
      requestedFor: typeof body.requestedFor === "string" && body.requestedFor ? body.requestedFor : "尽快",
    });
    return Response.json({ order }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "提交失败" }, { status: 400 });
  }
}
