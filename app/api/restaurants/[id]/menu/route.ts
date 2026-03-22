import { fetchMenuItems } from "@/modules/services/restaurant-menu";
import { NextRequest, NextResponse} from "next/server";

export async function GET(_request: NextRequest, { params }: { params: { id: string } },) {
    try {
        const { id } = await params;
        console.log("Fetching menu items for restaurant ID:", id);
        const menuItems = await fetchMenuItems(id);
        return NextResponse.json(menuItems);
    } catch (error) {
        console.error("Failed to fetch menu items", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );

    }
}