import { connect, disconnect } from "../database";
import { Discount } from "../models";
import { IDiscount } from "../../interfaces/discount";

export async function getDiscounts(): Promise<IDiscount[]> {
  try {
    await connect();
    const discounts = await Discount.find();
    await disconnect();
    return discounts;
  } catch (error) {
    console.error("getDiscounts(): ", { error });
    return [];
  }
}

export async function getDiscount(id: string): Promise<IDiscount | null> {
  try {
    await connect();
    const discount = await Discount.findById(id);
    if (!discount) return null;
    await disconnect();
    return discount;
  } catch (error) {
    await disconnect();
    console.error("getDiscount(): ", { error });
    return null;
  }
}

export async function editDiscount({
  id,
  discountInfo,
}: {
  id: string;
  discountInfo: {
    code: string;
    percentaje?: number;
    quantity?: number;
  };
}): Promise<null | IDiscount> {
  try {
    await connect();

    const discount = await Discount.findByIdAndUpdate(id, discountInfo, {
      new: true,
    });

    await disconnect();
    return discount;
  } catch (error) {
    await disconnect();
    console.error("getDiscount(): ", { error });
    return null;
  }
}

export async function createDiscount(
  discount: IDiscount
): Promise<null | IDiscount> {
  try {
    await connect();
    const newDiscount = new Discount(discount);
    await newDiscount.save();
    await disconnect();
    return newDiscount;
  } catch (error) {
    await disconnect();
    console.error({ error });
    return null;
  }
}

export async function deleteDiscount(id: string): Promise<boolean> {
  try {
    await connect();
    await Discount.findByIdAndDelete(id);
    await disconnect();
    return true;
  } catch (error) {
    await disconnect();
    console.error({ error });
    return false;
  }
}
