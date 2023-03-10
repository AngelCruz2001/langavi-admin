import { connect, disconnect } from "@/server/database";
import { Discount, Order } from "@/server/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, body } = req;

  try {
    await connect();
    const discounts = await Discount.find();
    for (const discount of discounts) {
      discount.timesUsed = 0;
      await discount.save();
    }

    const orders = await Order.find();
    for (const order of orders) {
      for (const dsc of order.discounts) {
        const code = dsc.code;
        const discount = discounts.find((d) => d.code === code);
        if (discount) {
          discount!.timesUsed = (discount!.timesUsed || 0) + 1;
          await discount!.save();
        }
      }
    }
    await disconnect();
  } catch (error) {
    console.log({ error });
    await disconnect();
    return res.status(500);
  }

  return res.status(200).json({ name: "Salvador" });
}
