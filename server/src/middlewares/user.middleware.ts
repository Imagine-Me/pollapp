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
  if (result) {
    console.log("EXISTS", result.get("id"));
  } else {
    const name = res.locals.name;
    const userData: UserModelType = {
      name,
      email,
    };
    const result = await createUser(userData);
    console.log("NEW", result.get("id"));
    // TODO - add to redis
  }
  next()
};

export default userMiddleWare;
