import { RoomModelsType } from "../models/room.model";
import { db } from "../db/index.db";

export const createRoom = (data: RoomModelsType) => {
  return db.room.upsert({ ...data });
};

export const joinRoom = (id: string) => {
  return db.room.findOne({ where: { id } });
};

export const getRoom = (id: string, userId: string) => {
  return db.room.findOne({
    where: {
      id,
      userId,
    },
  });
};
