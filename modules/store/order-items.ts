import {prisma} from "@/lib/prisma";

export const addItemToOrder = async (orderId: string, menuItemId: string, quantity: number) => {
     const Item = await prisma.orderItem.create({
        data: {
            orderId,
            menuItemId,
            quantity
        }
    });
    return Item;
}
