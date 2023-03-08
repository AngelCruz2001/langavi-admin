import {
  IOrder,
  IOrderDiscount,
  IProductOrder,
  orderStatusType,
  orderStatusTypeArray,
  PaymentMethods,
  paymentMethodsArray,
} from "@/interfaces";
import mongoose, { model, Model, Schema } from "mongoose";
import { addressSchema } from "./Client";

const orderDiscountSchema = new Schema<IOrderDiscount>({
  code: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: false,
  },
  percentaje: {
    type: Number,
    required: false,
  },
});

const productOrderSchema = new Schema<IProductOrder>({
  title: {
    type: String,
    required: true,
    lowercase: true,
  },
  variantName: {
    type: String,
    required: true,
    lowercase: true,
  },
  slug: {
    type: String,
    required: true,
    lowercase: true,
  },
  image: {
    type: String,
    required: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const orderSchema = new Schema<IOrder>({
  orderNumber: {
    type: String,
    unique: true,
    required: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  shippingAddress: {
    type: addressSchema,
    required: true,
  },
  billingAddress: {
    type: addressSchema,
    required: true,
  },
  products: {
    type: [productOrderSchema],
    required: true,
  },
  numberOfItems: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  tax: {
    type: { percent: String, amount: String },
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  paidAt: {
    type: String,
    required: true,
    default: new Date().toLocaleDateString("es-MX", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  },
  transactionId: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    enum: {
      values: orderStatusTypeArray,
      default: orderStatusType.inProcess,
    },
  },
  provider: {
    type: String,
    required: true,
    enum: {
      values: paymentMethodsArray,
    },
  },
  discounts: [
    {
      type: orderDiscountSchema,
      default: [],
    },
  ],
  shippingPrice: {
    type: Number,
    required: true,
    default: 50,
  },
  guideNumber: String,
  shippingProvider: String,
});

orderSchema.index({ clientId: "text", orderNumber: "text" });

const Order: Model<IOrder> =
  mongoose.models.Order || model("Order", orderSchema);

export default Order;
