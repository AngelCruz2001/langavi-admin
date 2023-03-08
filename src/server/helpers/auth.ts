import jwt from "jsonwebtoken";
import { getUser } from "./users";

const secret = process.env.SECRET || "";
const expiresIn = "24h";

export const createToken = (userId: string) => {
  const token = jwt.sign({ userId }, secret, { expiresIn });
  return `${token}`;
};

export const verifyToken = () => {};
