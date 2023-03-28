import { connect, disconnect, dropDB } from "@/server/database";
import { seedDiscounts, seedOrders, seedUsers } from "@/server/database/seed";
import { Client, Discount, Order, User } from "@/server/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { seedClients } from "../../server/database/seed";

type Data =
  | {
      message: string;
    }
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  switch (method) {
    case "GET": {
      try {
        await connect();
        // await dropDB();
        // for (const order of seedOrders) {
        //   const newOrder = new Order(order);
        //   await newOrder.save();
        // }
        // for (const client of seedClients) {
        //   const newClient = new Client(client);
        //   await newClient.save();
        // }
        // for (const discount of seedDiscounts) {
        //   const newDiscount = new Discount(discount);
        //   await newDiscount.save();
        // }
        for (const user of seedUsers) {
          const newUser = new User(user);
          await newUser.save();
        }
        await disconnect();
        return res.status(201).json({
          message: "Database filled succesfully",
        });
      } catch (error) {
        await disconnect();
        console.log("/seed: ", { error });
        return res.status(500).json({
          message:
            "Something went wrong. Check server console for more datails (/seed:)",
        });
      }
    }

    default:
      return res.status(405).json({
        error: "Method not allowed. Try with GET.",
      });
  }
}

// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };

// export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
//   res.status(200).json({ name: "Example" });
// }
