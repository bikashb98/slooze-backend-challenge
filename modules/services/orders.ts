import { createOrder, getOrderById, checkoutOrder, cancelOrder } from "../store/orders";

export async function createNewOrder(userId: string) {
  const order = await createOrder(userId);
  if (!order) {
    throw new Error("Failed to create order");
  }
  return { id: order.id, status: order.status };
}

export async function getOrderDetails(orderId: string, userId: string) {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  if (order.userId !== userId) {
    throw new Error("Forbidden");
  }
  return {
    id: order.id,
    status: order.status,
    amount: order.amount,
    items: order.items.map((item) => ({
      id: item.id,
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      price: item.price,
      menuItemName: item.menuItem.name,
    })),
  };
}

export async function placeOrder(orderId: string, userId: string) {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  if (order.userId !== userId) {
    throw new Error("Forbidden");
  }
  const checkedOutOrder = await checkoutOrder(orderId);
  return {
    id: checkedOutOrder.id,
    status: checkedOutOrder.status,
    amount: checkedOutOrder.amount,
  };
}

export async function removeOrder(orderId: string, userId: string) {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  if (order.userId !== userId) {
    throw new Error("Forbidden");
  }
  const deletedOrder = await cancelOrder(orderId);
  return {
    id: deletedOrder.id,
    status: deletedOrder.status,
  };
}
