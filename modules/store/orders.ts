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

export const getOrderById = async (orderId: string) => {
    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
            items: {
                include: {
                    menuItem: true,
                },
            },
        },
    });
    return order;
}

export const checkoutOrder = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.status !== OrderStatus.Created) {
    throw new Error("Only orders in 'Created' status can be checked out");
  }

  const items = await prisma.orderItem.findMany({
    where: { orderId },
  });
  
  if (items.length === 0) {
    throw new Error("Cannot checkout an order with no items");
  }

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if(totalAmount != order.amount) {
    throw new Error("Order amount mismatch. Please try again.");
  }

  const paymentMethod = await prisma.paymentMethod.findFirst({
    where: { userId: order.userId },
  });

  if (!paymentMethod) {
    throw new Error("No payment method found for user");
  }

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { status: OrderStatus.Placed },
  });

  return updatedOrder;
}