import { getOrder, orderSetShippingInfo } from "@/server/helpers/orders";
import { sendShippingInfoEmail } from "@/server/mails";
import type { NextApiRequest, NextApiResponse } from "next";
import { IOrder } from "../../../interfaces/order";

type Data =
  | {
      order: IOrder;
    }
  | {
      error: string;
    };

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET": {
      try {
        const order = await getOrder(String(id));
        if (!order) {
          return res.status(404).json({ error: "Order not found" });
        }
        return res.status(200).json({ order });
      } catch (error) {
        console.log("/pedidos/[id]: ", { error });
        return res.status(500).json({ error: "Server error" });
      }
    }

    case "POST": {
      const { guideNumber, shippingProvider } = body;
      if (!guideNumber || !shippingProvider)
        return res.status(402).json({
          error:
            "Body should be {guideNumber: string, shippingProvider: string}",
        });

      const order = await orderSetShippingInfo({
        guideNumber,
        shippingProvider,
        orderId: String(id),
      });

      if (order) {
        await sendShippingInfoEmail({
          to: "applebono3@gmail.com", // temporal
          order,
        });
        return res.status(201).json({ order });
      }

      return res.status(404).json({ error: "Order not found" });
    }

    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}
