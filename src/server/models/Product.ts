import {
  IProduct as ProductInterface,
  Categories,
  IImage,
  Colors,
  IProductVariant,
  INutrition,
} from "interfaces";
import mongoose, { model, Model, Schema } from "mongoose";

interface IDiscounts {
  createdAt: string;
  finalPrice: number;
}

export interface IProduct extends ProductInterface {
  discounts?: IDiscounts[];
}

interface ImageInterface extends IImage {}

export const imageSchema = new Schema<ImageInterface>({
  key: {
    required: true,
    type: String,
  },
  url: {
    required: true,
    type: String,
  },
});

const nutritionSchema = new Schema<INutrition>({
  title: {
    type: String,
    required: true,
  },
  full: {
    type: String,
    required: true,
  },
  portion: {
    type: String,
    required: true,
  },
});

const productVariantSchema = new Schema<IProductVariant>({
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: false,
  },
  image: {
    type: imageSchema,
    required: true,
  },
  variantName: {
    type: String,
    required: true,
  },
  nutrition: [nutritionSchema],
  variantImage: {
    type: imageSchema,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: String,
    },
  ],
});

const productSchema = new Schema<IProduct>(
  {
    title: {
      required: true,
      type: String,
    },
    slug: {
      required: true,
      type: String,
      unique: true,
    },
    description: {
      required: true,
      type: String,
      default: "",
    },
    color: {
      required: true,
      type: String,
      enum: {
        values: Object.values(Colors),
        default: Colors.red,
      },
    },
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
    variants: [productVariantSchema],
  },
  {
    timestamps: true,
  }
);

productSchema.index({ slug: "text" });

const Product: Model<IProduct> =
  mongoose.models.Product || model("Product", productSchema);

export default Product;
