import { db } from "../db/index.db";
import { UserModelType } from "../models/user.model";

export const createUser = (data: UserModelType) => {
  return db.user.create({ ...data });
};
export const getUser = (email: string) => {
  return db.user.findOne({ where: { email } });
};
