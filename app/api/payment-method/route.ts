import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/modules/middlewares/auth";
import { changePaymentMethod } from "@/modules/services/payment-method";
import { requireRole } from "@/modules/middlewares/role";
import { Role } from "@/prisma/generated/prisma/enums";
import { PaymentType } from "@/prisma/generated/prisma/enums";

export async function POST(request: NextRequest) {
  try {
    const user = await authMiddleware(request);
    const checkRole = requireRole([Role.Admin]);
    checkRole(user);

    const body = await request.json();
    const { user_id: userId, type } = body;

    if (!Object.values(PaymentType).includes(type as PaymentType)) {
      return NextResponse.json(
        { error: "Invalid payment method type" },
        { status: 400 },
      );
    }

    const updatedPayment = await changePaymentMethod(userId, type);
    return NextResponse.json({ message: "Payment method updated successfully", payment: updatedPayment }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
         if (error.message === "Forbidden") {
        return NextResponse.json(
          {
            error: "Only admin can change payment methods",
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
