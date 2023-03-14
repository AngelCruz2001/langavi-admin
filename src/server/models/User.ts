import { IUser, roleType, roleTypeArray } from "@/interfaces";
import {
  model,
  Model,
  models,
  Schema,
  SchemaType,
  SchemaTypes,
} from "mongoose";

const UserSchema = new Schema<IUser>({
  dispName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: roleTypeArray,
    default: roleType.admin,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User: Model<IUser> = models.User || model("User", UserSchema);

export default User;
