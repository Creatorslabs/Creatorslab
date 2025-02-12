import jwt from "jsonwebtoken";

export function signJwt(payload: object) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "30d" });
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
}
