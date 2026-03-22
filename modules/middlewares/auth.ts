import { verifyToken, type AuthTokenPayload } from "@/lib/jwt";
import { NextRequest } from "next/server";

export const authMiddleware = async (
  req: NextRequest,
): Promise<AuthTokenPayload> => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) throw new Error("Unauthorized");

  if (!authHeader.startsWith("Bearer ")) {
    throw new Error("Invalid authorization header");
  }

  const token = authHeader.split(" ")[1];

  if (!token) throw new Error("Unauthorized");

  try {
    const decoded = verifyToken(token);
    return decoded;
  } catch {
    throw new Error("Invalid token");
  }
};
