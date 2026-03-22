import { prisma } from "@/lib/prisma";

export async function getMenuItemsById(restaurantId: string) {
  const id = restaurantId.trim();

  if (!id) {
    throw new Error("restaurantId is required");
  }

  return prisma.menuItem.findMany({
    where: { restaurantId: id },
    orderBy: { name: "asc" },
  });
}
