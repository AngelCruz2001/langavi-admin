import { Types } from "mongoose";
import { ObjectValues } from "@/interfaces";

export const roleType = {
  admin: "administrador",
  seller: "vendedor",
} as const;

export const roleTypeArray = Object.values(roleType);

export type RoleType = ObjectValues<typeof roleType>;

export interface IDisplayUser {
  _id: string;
  dispName: string;
  role: RoleType;
  nickname: string;
  phoneNumber: string;
  totalReservedLots: number;
}
export interface IUser extends IDisplayUser {
  password: string;
  reservedLots: string[] | Types.ObjectId[]; // Lot id []
}
