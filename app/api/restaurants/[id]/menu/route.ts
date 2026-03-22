import { fetchMenuItems } from "@/modules/services/restaurant-menu";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/modules/middlewares/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await authMiddleware(request);
    const { id } = await params;
    console.log("Fetching menu items for restaurant ID:", id);
    const menuItems = await fetchMenuItems(id);
    return NextResponse.json(menuItems);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error("Failed to fetch menu items", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
