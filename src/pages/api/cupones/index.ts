import { IDiscount } from "@/interfaces";
import {
  createDiscount,
  getDiscount,
  getDiscounts,
} from "@/server/helpers/discounts";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      error: string;
    }
  | {
      discounts: IDiscount[];
    }
  | {
      discount: IDiscount;
    };

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, body } = req;

  switch (method) {
    case "GET": {
      try {
        const discounts = await getDiscounts();
        return res.status(200).json({
          discounts,
        });
      } catch (error) {
        return res.status(500).json({
          error: "Dígale al Richi",
        });
      }
    }

    case "POST": {
      const { quantity, percentaje } = body;
      if (quantity && percentaje)
        return res.status(401).json({
          error: "Discounts can only have either quantity or percentaje.",
        });
      try {
        console.log(body);
        const newDiscount = await createDiscount(body);
        console.log(newDiscount);
        if (!newDiscount)
          return res.status(401).json({
            error: "Check your req body or server console.",
          });
        return res.status(201).json({ discount: newDiscount });
      } catch (error) {
        console.error({ error });
      }
    }

    default:
      return res.status(405);
  }
}
