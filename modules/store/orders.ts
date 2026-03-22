import { prisma } from "../../lib/prisma";
import { OrderStatus } from "@/prisma/generated/prisma/enums";

export const createOrder = async (userId: string, amount: number) => {
    const order = await prisma.order.create({
      data: {
        userId,
        amount,
        status: OrderStatus.Created,
      },
    });
    return order;
 
};
