import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

export interface AuthTokenPayload extends JwtPayload {
  id: string;
  email?: string;
  country: string;
  role: string;
  name?: string;
}

export const signToken = (payload: object) => {
  return jwt.sign(payload, secretKey!, { expiresIn: "1h" });
};

export const verifyToken = (token: string): AuthTokenPayload => {
  try {
    const decoded = jwt.verify(token, secretKey!);

    if (typeof decoded === "string" || !decoded || !("id" in decoded)) {
      throw new Error("Invalid token payload");
    }

    if (
      !("role" in decoded) ||
      !("country" in decoded) ||
      typeof decoded.role !== "string" ||
      typeof decoded.country !== "string"
    ) {
      throw new Error("Invalid token payload");
    }

    return decoded as AuthTokenPayload;
  } catch (err) {
    throw new Error("Invalid token", { cause: err });
  }
};
