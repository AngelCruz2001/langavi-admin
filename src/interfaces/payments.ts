import { ObjectValues } from ".";
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

export const paymentMethods = {
  stripe: "stripe",
  paypal: "paypal",
} as const;

export const paymentMethodsArray = Object.values(paymentMethods);

export type PaymentMethods = ObjectValues<typeof paymentMethods>;
