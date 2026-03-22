import { verifyToken } from "@/lib/jwt"
import { NextRequest } from "next/server"
    
export const authMiddleware = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization")

  if (!authHeader) throw new Error("Unauthorized")

  const token = authHeader.split(" ")[1]

  const decoded = verifyToken(token)

  return decoded
}