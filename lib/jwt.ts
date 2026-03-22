import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET;

export const signToken = (payload: object) => {
  return jwt.sign(payload, secretKey!, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey!);
  } catch (err) {
    throw new Error("Invalid token", { cause: err });
  }
};
