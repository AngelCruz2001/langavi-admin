// import { IUser } from "interfaces";
import { IUser } from "@/interfaces";
import { Types } from "mongoose";
import { connect, disconnect } from "@/server/database";
import { User } from "@/server/models";

// export const getUsers = async () => {
//     try {
//       await connect();
//       const lots = await Lot.find();
//       await disconnect();
//       return lots;
//     } catch (error) {
//       await disconnect();
//     }
//   };

export const getUser = async (searchParam: string): Promise<IUser | null> => {
  try {
    await connect();
    let user = Types.ObjectId.isValid(searchParam)
      ? await User.findById(searchParam)
      : await User.findOne({ nickname: searchParam });
    await disconnect();
    if (user) return user;
    throw new Error("No existe");
  } catch (error) {
    await disconnect();
    console.log("getUser: ", error);
    return null;
  }
};

// export const updateLotInfo = async (
//   lotId: string,
//   newLotInfo: Partial<ILot>
// ) => {
//   try {
//     await connect();
//     const lot = await Lot.findByIdAndUpdate(lotId, newLotInfo);
//     await disconnect();
//     if (!lot) {
//       throw new Error("No existe");
//     }
//     return lot;
//   } catch (error) {
//     await disconnect();
//     return { error: String(error) };
//   }
// };

// export const updateLotStatus = async (lotId: string, newStatus: StatusType) => {
//   try {
//     const lot = await getLotById(lotId);
//     return lot;
//   } catch (error) {
//     await disconnect();
//     return { error: String(error) };
//   }
// };
