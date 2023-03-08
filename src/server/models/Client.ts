import { IAddress, IClient } from "interfaces";
import mongoose, { model, Model, Schema } from "mongoose";

export const addressSchema = new Schema<IAddress>({
  firstName: {
    type: String,
    required: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
  },
  address: {
    type: String,
    required: true,
    lowercase: true,
  },
  address2: {
    type: String,
    required: false,
    lowercase: true,
  },
  city: {
    type: String,
    required: true,
    lowercase: true,
  },
  estate: {
    type: String,
    required: true,
    lowercase: true,
  },
  country: {
    type: String,
    required: true,
    lowercase: true,
  },
  zip: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

export const clientSchema = new Schema<IClient>({
  firstName: {
    type: String,
    required: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  addresses: [
    {
      type: [addressSchema],
      required: true,
      default: [],
    },
  ],
  //   TODO: orders
});

const Client: Model<IClient> =
  mongoose.models.Client || model("Client", clientSchema);

export default Client;
