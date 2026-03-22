import { NextResponse, NextRequest } from "next/server";
import { login } from "@/modules/services/auth";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const token = await login(email);
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid email") {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    console.error("Login route failed", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
