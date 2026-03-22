import { fetchAllRestaurants } from "@/modules/services/restaurants";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/modules/middlewares/auth";

export async function GET(req: NextRequest) {
  try {
    await authMiddleware(req);

    const restaurants = await fetchAllRestaurants();
    return NextResponse.json(restaurants, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurants" },
      { status: 500 },
    );
  }
}
