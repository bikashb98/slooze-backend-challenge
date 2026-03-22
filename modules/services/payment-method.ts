import { updatePaymentMethod } from "../store/payment-methods";
import { PaymentType } from "@/prisma/generated/prisma/enums";

export async function changePaymentMethod(userId: string, type: PaymentType) {
  const updatedPayment = await updatePaymentMethod(userId, type);
  return {
    id: updatedPayment.id,
    userId: updatedPayment.userId,
    type: updatedPayment.type,
  };
}