import { IClient } from "@/interfaces";
import { Types } from "mongoose";
import { connect, disconnect } from "../database";
import { Client } from "../models";

export async function getClient(
  id: string | Types.ObjectId
): Promise<IClient | null> {
  try {
    await connect();
    const client = await Client.findById(id);
    await disconnect();
    return client;
  } catch (error) {
    console.error("getClient(): ", { error });
    await disconnect();
    return null;
  }
}
