import { getAllRestaurants } from "../store/restaurants";

export async function fetchAllRestaurants() {
  const restaurants = await getAllRestaurants();

  if (!restaurants) {
    throw new Error("Failed to fetch restaurants");
  }

  return restaurants;
}
