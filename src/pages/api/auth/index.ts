import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { roleType } from "@/interfaces";
import { User } from "@/server/models";
import { verifyToken } from "../../../server/helpers/auth";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, body } = req;
  const { token } = body;

  verifyToken(token);

  res.status(200).json({ name: "Example" });
}
