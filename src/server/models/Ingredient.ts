import { IIngredient } from "@/interfaces";
import mongoose, { model, Model, Schema } from "mongoose";

export const ingredientSchema = new Schema<IIngredient>({
  name: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  url: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
});

const Ingredient: Model<IIngredient> =
  mongoose.models.Ingredient || model("Ingredient", ingredientSchema);

export default Ingredient;
