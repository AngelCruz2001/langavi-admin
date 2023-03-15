import { verifyToken } from "@/server/helpers";
import { getClient } from "@/server/helpers/clients";
import { getOrder, orderSetShippingInfo } from "@/server/helpers/orders";
import { sendShippingInfoEmail } from "@/server/mails";
import type { NextApiRequest, NextApiResponse } from "next";
import { IOrder, orderStatusTypeArray } from "../../../interfaces/order";

type Data =
  | {
      order: IOrder;
    }
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    method,
    body,
    query: { id },
    // cookies,
  } = req;

  // const token =
  //   cookies.auth?.replace("%20", "").replace("Bearer", "").replace(" ", "") ||
  //   "";
  // const isAuth = await verifyToken(token);
  // console.log({ token });

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
        return res.status(406).json({
          error:
            "Body should be {guideNumber: string, shippingProvider: string}",
        });

      const order = await orderSetShippingInfo({
        guideNumber,
        shippingProvider,
        orderId: String(id),
      });

      if (order) {
        const client = await getClient(order.clientId);
        await sendShippingInfoEmail({
          // to: "applebono3@gmail.com", // temporal
          to: client?.email || "i.s.ricardo.sandoval@gmail.com",
          order,
        });
        return res.status(201).json({ order });
      }

      return res.status(404).json({ error: "Order not found" });
    }

    case "PUT": {
      try {
        const { status } = body;
        if (!orderStatusTypeArray.includes(status)) {
          console.log({ status });
          return res.status(406).json({ error: "Invalid status" });
        }
        const order = await getOrder(String(id));
        if (!order) {
          return res.status(404).json({ error: "Order not found" });
        }
        order.orderStatus = status;
        await order.save();
        return res.status(201).json({ order });
      } catch (error) {
        console.log("/pedidos/[id]: ", { error });
        return res.status(500).json({ error: "Server error" });
      }
    }

    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}
