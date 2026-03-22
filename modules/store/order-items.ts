import {prisma} from "@/lib/prisma";

export const addItemToOrder = async (orderId: string, menuItemId: string, quantity: number) => {

    const menuItem = await prisma.menuItem.findUnique({
        where: { id: menuItemId },
    });

    if (!menuItem) {
        throw new Error("Menu item not found");
    }

     const Item = await prisma.orderItem.create({
        data: {
            orderId,
            menuItemId,
            quantity,
            price: menuItem.price
        }
    });

    const items = await prisma.orderItem.findMany({
        where: { orderId },
    });

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await prisma.order.update({
        where: { id: orderId },
        data: { amount: totalAmount },
    });
    return Item;
}
