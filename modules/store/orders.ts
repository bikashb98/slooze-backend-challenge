import { prisma } from "../../lib/prisma";
import { OrderStatus } from "@/prisma/generated/prisma/enums";

export const createOrder = async (userId: string) => {
    const order = await prisma.order.create({
      data: {
        userId,
        amount: 0, // Initial amount, will be updated when items are added
        status: OrderStatus.Created,
      },
    });
    return order;
  }

