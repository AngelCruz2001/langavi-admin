import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import { getUser, createToken } from "@/server/helpers";

type Data =
  | {
      token: string;
    }
  | {
      error: string;
    };

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // res.status(200).json({ name: 'Example' })

  const { method } = req;

  switch (method) {
    case "POST": {
      const { nickname, password } = req.body;
      console.log({ nickname, password });
      //   const token = createToken(nickname);
      const user = await getUser(nickname);
      if (!user) {
        return res
          .status(401)
          .json({ error: "No se pudo autenticar el usuario" });
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      console.log({ isPasswordCorrect });

      if (!isPasswordCorrect) {
        return res
          .status(401)
          .json({ error: "No se pudo autenticar el usuario" });
      }
      const token = "Bearer " + createToken(user._id);
      res.setHeader("Set-Cookie", serialize("auth", token, { path: "/" }));
      return res.status(200).json({ token });
    }

    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}
