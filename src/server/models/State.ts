import { IPos, IState } from "@/interfaces";
import mongoose, { model, Model, models, Schema } from "mongoose";
import { imageSchema } from "./Product";

const PosSchema = new Schema<IPos>({
  name: {
    type: String,
    required: true,
  },
  image: imageSchema,
  href: {
    type: String,
  },
});

const StateSchema = new Schema<IState>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  xml: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
    default: false,
  },
  posList: {
    type: [PosSchema],
    default: [],
  },
});

StateSchema.index({
  name: "text",
});

export const State: Model<IState> = models.State || model("State", StateSchema);
export const Pos: Model<IPos> = models.Pos || model("Pos", PosSchema);
