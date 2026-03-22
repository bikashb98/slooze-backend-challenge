import { fetchAllRestaurants } from "@/modules/services/restaurants";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const restaurants = await fetchAllRestaurants();
        return NextResponse.json(restaurants, { status: 200 });
    }catch (error) {
        console.error("Error fetching restaurants:", error);
        return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: 500 });
    }
}