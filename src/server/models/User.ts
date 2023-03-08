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
  dispName: String,
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
});

const User: Model<IUser> = models.User || model("User", UserSchema);

export default User;
