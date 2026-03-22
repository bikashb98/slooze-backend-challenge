import { prisma } from "@/lib/prisma";
import { PaymentType } from "@/prisma/generated/prisma/enums";

export const updatePaymentMethod = async (userId: string, type: PaymentType) => {
    const checkUser = await prisma.paymentMethod.findUnique({
        where: { userId },
    });

    if (!checkUser) {
        throw new Error("User not found");
    }

    const updatedPayment = await prisma.paymentMethod.update({
        where: { userId },
        data: { type },
    });

    return updatedPayment;
}