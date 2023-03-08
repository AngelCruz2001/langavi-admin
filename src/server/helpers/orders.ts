import { IDisplayOrder, IOrder, OrderStatusType } from "@/interfaces";
import { Model } from "mongoose";
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

export async function getOrder(id: string): Promise<IOrder | undefined> {
  try {
    await connect();
    const order = await Order.findById(id);
    if (order) {
      await disconnect();
      return order;
    }
  } catch (error) {
    await disconnect();
    console.log("getFullOrder(): ", { error });
    throw new Error("getFullOrderError");
  }
}

export async function orderSetShippingInfo({
  orderId,
  shippingProvider,
  guideNumber,
}: {
  orderId: string;
  shippingProvider: string;
  guideNumber: string;
}): Promise<IOrder | undefined> {
  try {
    await connect();
    const order = await Order.findById(orderId);
    if (!order) return;
    order.shippingProvider = shippingProvider;
    order.guideNumber = guideNumber;
    await order.save();
    await disconnect();
    return order;
  } catch (error) {
    await disconnect();
    console.log("orderSetShippingInfo(): ", { error });
    return;
  }
}
