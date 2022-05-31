import { getUser } from "./../controller/user.controller";
import { OAuth2Client } from "google-auth-library";
import { Socket } from "socket.io";

const client = new OAuth2Client();

export const authMiddleware = async (socket: Socket, next: any) => {
  const auth = socket.handshake.auth;
  if (auth && auth.token) {
    try {
      console.log("MIDDLEWARE CALLED");
      const ticket = await client.verifyIdToken({
        idToken: auth.token,
        audience: process.env.CLIENT_ID ?? "",
      });
      const data = ticket.getPayload();
      if (data && data.email) {
        const result = await getUser(data.email);
        if (result) {
          socket.handshake.query.userId = result.get("id") as string;
        }
      }
    } catch (e) {
      console.log("ERROR IN SOCKET MIDDLEWARE");
      next();
    }
  }
  next();
};
