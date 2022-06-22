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
  if (res.statusCode !== 401) res.status(500);
  res.send({ message: err });
};

export default errorMiddleware;
