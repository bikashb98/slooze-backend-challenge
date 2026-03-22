import { getAllRestaurants } from "../store/restaurants";
import { Role} from "@/prisma/generated/prisma/enums";

export async function fetchAllRestaurants(role: string, country: string) {
  const restaurants = await getAllRestaurants();

  if (!restaurants) {
    throw new Error("Failed to fetch restaurants");
  }

  if (role !== Role.Admin) {
    return restaurants.filter((restaurant) => restaurant.country === country);
  }

  return restaurants;
}
