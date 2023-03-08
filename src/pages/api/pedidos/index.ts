import { IDisplayOrder, orderStatusType } from "@/interfaces";
import { getDisplayOrders } from "@/server/helpers/orders";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      orders: IDisplayOrder[];
      currentPage: number;
      totalPages: number;
    }
  | {
      error: string;
    };

export const statusArr = [
  orderStatusType.preparing,
  orderStatusType.sent,
  orderStatusType.received,
];

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const { query } = req;
      const { page = 1, status = 0 } = query;

      try {
        if (status > 0 && status < 4) {
          const currentOrders = await getDisplayOrders(
            Number(page),
            statusArr[Number(status) - 1]
          );
          if (currentOrders) {
            return res.status(200).json(currentOrders);
          }
        }

        const currentOrders = await getDisplayOrders(Number(page));
        if (currentOrders) {
          return res.status(200).json(currentOrders);
        }
        return res
          .status(500)
          .json({ error: "Server error. Try again later." });
      } catch (error) {}
    }

    default:
      return res.status(405).json({
        error: "Method not allowed",
      });
  }
}
