import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.send({ message: err });
};

export default errorMiddleware;
