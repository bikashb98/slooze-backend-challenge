import { createOrder, getOrderById } from "../store/orders";

export async function createNewOrder(userId: string) {
    const order = await createOrder(userId);
    if (!order) {
        throw new Error("Failed to create order");
    }
    return {id: order.id, status: order.status};
}

export async function getOrderDetails(orderId: string) {
    const order = await getOrderById(orderId);
    if (!order) {
        throw new Error("Order not found");
    }
    return {
        id: order.id,
        status: order.status,
        amount: order.amount,
        items: order.items.map(item => ({
            id: item.id,
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: item.price,
            menuItemName: item.menuItem.name
        }))
    };
}