import { IOrderDiscount } from "./discount";
import { IAddress } from "./order";
import { IProductOrder } from "./products";

export interface IPostProduct {
  slug: string;
  variantName: string;
  quantity: number;
}

export interface IPostPayment {
  id: string;
  information: {
    address: IAddress;
    email: string;
  };
  discounts: IOrderDiscount[];
  products: IPostProduct[];
  provider: PaymentMethods;
}

export enum PaymentMethods {
  stripe = "stripe",
  paypal = "paypal",
}
