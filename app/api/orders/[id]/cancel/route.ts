import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/modules/middlewares/auth";
import { removeOrder } from "@/modules/services/orders";
import { requireRole } from "@/modules/middlewares/role";
import { Role } from "@/prisma/generated/prisma/enums";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const user = await authMiddleware(request);
    const checkRole = requireRole([Role.Admin, Role.Manager]);
    checkRole(user);
    const { id: orderId } = await params;
    const cancelled = await removeOrder(orderId, user.id);
    return NextResponse.json(
      { message: "Order cancelled successfully", order: cancelled },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Forbidden") {
        return NextResponse.json(
          {
            error: "Only admin and manager can cancel orders",
            message: error.message,
          },
          { status: 403 },
        );
      }
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
