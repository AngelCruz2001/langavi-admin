import { IContactForm } from "interfaces";
import mongoose, { model, Model, models, Schema } from "mongoose";

const FormContactSchema = new Schema<IContactForm>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

FormContactSchema.index({
  phoneNumber: "text",
});

const FormContact: Model<IContactForm> =
  models.FormContact || model("FormContact", FormContactSchema);

export default FormContact;
