import { RoomModelsType } from "../models/room.model";
import { db } from "../db/index.db";

export const createRoom = (data: RoomModelsType) => {
  return db.room.upsert({ ...data });
};
