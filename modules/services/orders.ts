import { createOrder } from "../store/orders";

export async function createNewOrder(userId: string) {
    const order = await createOrder(userId);
    if (!order) {
        throw new Error("Failed to create order");
    }
    return {id: order.id, status: order.status};
}