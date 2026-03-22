import { addItemToOrder } from "../store/order-items";

export async function addItem(orderId: string, menuItemId: string, quantity: number) {
    const item = await addItemToOrder(orderId, menuItemId, quantity);
    if (!item) {
        throw new Error("Failed to add item to order");
    }
    return {id: item.id, orderId: item.orderId, menuItemId: item.menuItemId, quantity: item.quantity};
}