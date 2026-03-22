import { AuthTokenPayload } from "@/lib/jwt";

export const requireRole = (allowedRoles: string[]) => {
  return (user: AuthTokenPayload) => {
    if (!user.role || !allowedRoles.includes(user.role)) {
      throw new Error("Forbidden")
    }
  }
}