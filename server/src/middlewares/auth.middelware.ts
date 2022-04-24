import { Request, Response, NextFunction } from "express";
import axios from "axios";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const bearerToken = req.headers.authorization.split(" ")[1];
    try {
      const { data } = await axios({
        url: `https://oauth2.googleapis.com/tokeninfo?id_token=${bearerToken}`,
        method: "GET",
      });
      const { email, name } = data;
      res.locals.email = email;
      res.locals.name = name;
      next();
    } catch (e) {
      next(e);
    }
  } else {
    const error = new Error("Invalid credentials");
    next(error);
  }
};

export default authMiddleware;
