import { Request, Response, NextFunction } from "express";
const protectedRouteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.statusCode === 401) {
    next(res);
  }
  next();
};

export default protectedRouteMiddleware;
