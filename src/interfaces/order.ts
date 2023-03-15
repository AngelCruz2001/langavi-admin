import { ObjectValues } from ".";
import { IOrderDiscount } from "./discount";
import { PaymentMethods } from "./payments";
import { IProductOrder } from "./products";

export const orderStatusType = {
  inProcess: "procesando pedido",
  preparing: "preparando pedido para ser enviado",
  sent: "enviado",
  received: "entregado",
} as const;

export const orderStatusTypeArray = Object.values(orderStatusType);

export type OrderStatusType = ObjectValues<typeof orderStatusType>;

export interface IAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  city: string;
  estate: string;
  country: string;
  zip: string;
  phone: string;
}

export interface IOrder {
  _id: string;
  clientId: string;
  shippingAddress: IAddress;
  billingAddress: IAddress;
  products: IProductOrder[];
  numberOfItems: number;
  subtotal: number;
  total: number;
  tax: {
    percent?: string;
    amount?: number;
  };
  paidAt: string;
  transactionId: string;
  orderStatus: OrderStatusType;
  provider: PaymentMethods;
  discounts: IOrderDiscount[];
  orderNumber: string;
  shippingPrice: number;
  guideNumber?: string;
  shippingProvider?: string;
}

export interface IDisplayOrder {
  _id: string;
  total: number;
  numberOfItems: number;
  shippingAddress: string;
  paidAt: string;
  orderStatus: string;
  orderNumber: string;
  provider: string;
}
