import {prisma} from "@/lib/prisma";

export const addItemToOrder = async (orderId: string, menuItemId: string, quantity: number) => {
    // Check if the order exists
    const menuItem = await prisma.menuItem.findUnique({
        where: { id: menuItemId },
    });

    if (!menuItem) {
        throw new Error("Menu item not found");
    }
    // Check order status
    const order = await prisma.order.findUnique({
        where: { id: orderId },
    });
    if (order?.status !== "Created") {
        throw new Error("Cannot add items to an order that is not in 'Created' status");
    }
    // Create the order item
     const Item = await prisma.orderItem.create({
        data: {
            orderId,
            menuItemId,
            quantity,
            price: menuItem.price
        }
    });
    // Update the total amount of the order
    const items = await prisma.orderItem.findMany({
        where: { orderId },
    });

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // Update the order with the new total amount
    await prisma.order.update({
        where: { id: orderId },
        data: { amount: totalAmount },
    });
    return Item;
}
