import { updateOrderStatus } from "@/lib/data";
import type { OrderStatus } from "@/lib/types";

export const runtime = "nodejs";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const order = updateOrderStatus(Number(id), body.status as OrderStatus);
    return Response.json({ order });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "更新失败" }, { status: 400 });
  }
}
