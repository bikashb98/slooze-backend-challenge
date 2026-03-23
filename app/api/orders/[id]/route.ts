import { getOrderDetails } from "@/modules/services/orders";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/modules/middlewares/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const user = await authMiddleware(request);
    const { id: orderId } = await params;
    const order = await getOrderDetails(orderId, user.id, user.role);
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User Forbidden") {
        return NextResponse.json(
          {
            error: "Only admins can view orders of other user",
            message: error.message,
          },
          { status: 403 },
        );
      }
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json(
        { error: "User is not authorized", message: error.message },
        { status: 403 },
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
