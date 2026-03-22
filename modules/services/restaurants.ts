import { getAllRestaurants } from "../store/restaurants";

export async function fetchAllRestaurants() {
    return await getAllRestaurants();
}