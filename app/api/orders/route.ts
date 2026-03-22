import { createNewOrder } from "@/modules/services/orders";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/modules/middlewares/auth";

export async function POST(request: NextRequest) {
    try {
        const user = await authMiddleware(request);
        const order = await createNewOrder(user.id);
        return NextResponse.json(order, { status: 201 });
    }catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 401 });
        }
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}