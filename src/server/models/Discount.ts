import { IDiscount } from "@/interfaces";
import mongoose, { model, Model, Schema } from "mongoose";

const discountSchema = new Schema<IDiscount>({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  quantity: {
    type: Number,
  },
  percentaje: {
    type: Number,
  },
  expirationDate: {
    type: String,
  },
  active: {
    type: Boolean,
  },
});

discountSchema.index({ code: "text" });

const Discount: Model<IDiscount> =
  mongoose.models.Discount || model("Discount", discountSchema);

export default Discount;
