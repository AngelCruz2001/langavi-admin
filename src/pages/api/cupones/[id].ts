import type { NextApiRequest, NextApiResponse } from "next";
import {
  createDiscount,
  deleteDiscount,
  editDiscount,
  getDiscount,
} from "@/server/helpers/discounts";
import { IDiscount } from "@/interfaces";
import { Types } from "mongoose";

type Data =
  | {
      discount: IDiscount;
    }
  | {
      error: string;
    }
  | {
      message: string;
    };

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, query, body } = req;
  const id = (query.id as string) || "";
  if (!Types.ObjectId.isValid(id))
    return res.status(401).json({
      error: `${id} is not a valid discount id`,
    });

  try {
    const discount = await getDiscount(id);

    if (!discount)
      return res.status(400).json({
        error: "Not found",
      });

    switch (method) {
      case "GET": {
        return res.status(200).json({
          discount,
        });
      }

      case "PUT": {
        const { quantity, percentaje } = body;
        if (quantity && percentaje)
          return res.status(401).json({
            error: "Discounts can only have either quantity or percentaje.",
          });
        try {
          const discount = await editDiscount({ id, discountInfo: body });

          if (!discount) return res.status(400).json({ error: "Not found" });

          return res.status(201).json({
            discount,
          });
        } catch (error) {
          console.error({ error });
          return res
            .status(500)
            .json({ error: "Server error. Check console for detailed error" });
        }
      }

      case "DELETE": {
        try {
          const discount = await deleteDiscount(id);
          if (!discount) return res.status(400).json({ error: "Not found" });

          return res.status(201).json({
            message: "Discount deleted successfully",
          });
        } catch (error) {
          console.error({ error });
          return res
            .status(500)
            .json({ error: "Server error. Check console for detailed error" });
        }
      }

      default:
        return res.status(405).json({
          error: "Method not allowed",
        });
    }
  } catch (error) {
    console.error({ error });
    return res.status(405).json({
      error: "Server error. Check console for detailed error",
    });
  }
}
