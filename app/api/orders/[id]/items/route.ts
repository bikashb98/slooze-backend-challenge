import { addItem } from "@/modules/services/order-items";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/modules/middlewares/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const user = await authMiddleware(request);
    const { id: orderId } = await params;
    const { menu_item_id: menuItemId, quantity } = await request.json();
    const item = await addItem(
      orderId,
      menuItemId,
      quantity,
      user.role,
      user.country,
    );
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User Forbidden") {
        return NextResponse.json(
          {
            error:
              "Only Admins can add items to order from restaurants other than your country",
            message: error.message,
          },
          { status: 403 },
        );
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
