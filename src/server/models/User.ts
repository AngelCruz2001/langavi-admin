import { IUser, roleTypeArray } from "interfaces";
import {
  model,
  Model,
  models,
  Schema,
  SchemaType,
  SchemaTypes,
} from "mongoose";

const UserSchema = new Schema<IUser>({
  dispName: String,
  role: {
    type: String,
    enum: roleTypeArray,
    default: "vendedor",
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  totalReservedLots: Number,
  password: {
    type: String,
    required: true,
  },
  reservedLots: {
    type: [SchemaTypes.ObjectId],
    ref: "Lot",
  },
});

const User: Model<IUser> = models.User || model("User", UserSchema);

export default User;
