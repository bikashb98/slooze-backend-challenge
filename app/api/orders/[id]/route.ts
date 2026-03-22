import { getOrderDetails } from "@/modules/services/orders";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/modules/middlewares/auth";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await authMiddleware(request);
        const { id: orderId } = await params;
        const order = await getOrderDetails(orderId);
        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 401 });
        }
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}