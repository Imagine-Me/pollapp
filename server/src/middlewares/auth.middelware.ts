import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client();

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    process.env.NODE_ENV === "test" ||
    process.env.NODE_ENV === "development"
  ) {
    res.locals.email = "johndoe@email.com";
    res.locals.name = " John Doe";
    next();
  } else {
    console.log('DEVELOPMENT OK')
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      const bearerToken = req.headers.authorization.split(" ")[1];
      console.log(bearerToken);

      try {
        const ticket = await client.verifyIdToken({
          idToken: bearerToken,
          audience: process.env.CLIENT_ID ?? "",
        });
        const data = ticket.getPayload();
        res.locals.email = data?.email;
        res.locals.name = data?.name;
        next();
      } catch (e: any) {
        console.log("error", e);
        next(e);
      }
    } else {
      console.log('NO BEARER TOKEN')
      next();
    }
  }
};

export default authMiddleware;
