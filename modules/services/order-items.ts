import { addItemToOrder, findRestaurantByMenuItemId } from "../store/order-items";
import { Role } from "@/prisma/generated/prisma/enums";

export async function addItem(
  orderId: string,
  menuItemId: string,
  quantity: number,
  role: string,
  country: string
) {
    const restaurant = await findRestaurantByMenuItemId(menuItemId);
    if (role != Role.Admin && restaurant?.country !== country) {
        throw new Error("User Forbidden");
    }

  const item = await addItemToOrder(orderId, menuItemId, quantity);
  if (!item) {
    throw new Error("Failed to add item to order");
  }
  return {
    id: item.id,
    orderId: item.orderId,
    menuItemId: item.menuItemId,
    quantity: item.quantity,
  };
}
