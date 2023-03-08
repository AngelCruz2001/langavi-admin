import { IDisplayOrder, OrderStatusType } from "@/interfaces";
import { connect, disconnect } from "../database";
import { Order } from "../models";

interface ReturnDisplayOrder {
  orders: IDisplayOrder[];
  currentPage: number;
  totalPages: number;
}

export const getDisplayOrders = async (
  clientPage: number = 1,
  status?: OrderStatusType
): Promise<ReturnDisplayOrder | null> => {
  try {
    await connect();
    const limit = 10;
    const count = status
      ? await Order.find({ orderStatus: status }).count()
      : await Order.count();
    const totalPages = Math.ceil(count / limit) || 1;
    const page = clientPage <= totalPages ? clientPage : 1;
    const orders = status
      ? await Order.find({
          orderStatus: status,
        })
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec()
      : await Order.find()
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec();

    // get total documents in the Order collection
    await disconnect();
    return {
      orders: orders.map(
        ({
          _id,
          total,
          numberOfItems,
          shippingAddress,
          paidAt,
          orderStatus,
          orderNumber,
          provider,
        }) => ({
          _id,
          total,
          numberOfItems,
          paidAt,
          orderStatus,
          orderNumber,
          provider,
          shippingAddress: `${shippingAddress.city},${shippingAddress.estate}.`,
        })
      ),
      currentPage: page,
      totalPages,
    };
  } catch (err) {
    await disconnect();
    return null;
  }
};

// export interface IDisplayOrder {
//     _id: string;
//     total: number;
//     numberOfItems: number;
//     shippingAddress: string;
//     paidAt: string;
//     orderStatus: string;
//     orderNumber: string;
//     provider: string;
//   }
