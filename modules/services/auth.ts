import { signToken } from "@/lib/jwt";
import { getUserFromEmail } from "../store/auth";

export async function login(email: string) {
  const user = await getUserFromEmail(email);

  if (!user) {
    throw new Error("Invalid email");
  }

  return signToken({
    id: user.id,
    email: user.email,
    country: user.country,
    role: user.role,
    name: user.name,
  });
}
