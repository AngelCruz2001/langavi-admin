import { IOrderDiscount } from "./discount";
import { PaymentMethods } from "./payments";
import { IProductOrder } from "./products";

export enum OrderStatus {
  inProcess = "procesando pedido",
  preparing = "preparando pedido para ser enviado",
  sent = "enviado",
  received = "entregado",
}

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
  clientId?: string;
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
  orderStatus: OrderStatus;
  provider: PaymentMethods;
  discounts: IOrderDiscount[];
  orderNumber: string;
  shippingPrice: number;
}
