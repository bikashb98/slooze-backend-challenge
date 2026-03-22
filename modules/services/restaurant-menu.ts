import { getMenuItemsById } from "../store/restaurant-menu";

export async function fetchMenuItems(restaurantId: string) {
  const menuItems = await getMenuItemsById(restaurantId);

  if (!menuItems) {
    throw new Error("Failed to fetch menu items");
  }
  return menuItems;
}
