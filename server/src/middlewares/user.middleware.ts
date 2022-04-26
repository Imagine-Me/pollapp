import { Request, Response, NextFunction } from "express";
import { UserModelType } from "../models/user.model";
import { createUser, getUser } from "../controller/user.controller";

const userMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = res.locals.email;
  const result = await getUser(email);
  let userId: number;
  if (result) {
    userId = result.get("id") as number;
  } else {
    const name = res.locals.name;
    const userData: UserModelType = {
      name,
      email,
    };
    const result = await createUser(userData);
    userId = result.get("id") as number;
    // TODO - add to redis
  }
  res.locals.userId = userId;
  
  next();
};

export default userMiddleWare;
