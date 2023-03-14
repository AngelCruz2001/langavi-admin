import jwt from "jsonwebtoken";
import { getUser } from "./users";

const secret = process.env.SECRET || "";
const expiresIn = "24h";

export function createToken(userId: string) {
  const token = jwt.sign({ userId }, secret, { expiresIn });
  return `${token}`;
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const data = jwt.verify(token, secret);
    console.log({ data });
    const userId = (data as { userId: string }).userId;
    if (!userId) return false;
    const user = await getUser(userId);
    return !!user;
  } catch (error) {
    console.log("verifyToken(): ", { error });
    return false;
  }
}
