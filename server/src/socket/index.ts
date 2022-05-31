import { createServer } from "http";
import { Server as Socket } from "socket.io";
import { Express } from "express";
import { authMiddleware } from "./../middlewares/authSocket.middleware";

interface ConnectionQuery {
  id: string;
  type: "host" | "join";
  [x: string]: string;
}

export default function initializeSocket(app: Express) {
  const httpServer = createServer(app);
  const io = new Socket(httpServer, {
    cors: { origin: "*" },
  });

  // MIDDLEWARES
  io.use(authMiddleware);

  io.on("connection", (socket) => {
    const query = socket.handshake.query as ConnectionQuery;
    if (query) {
      const roomId = query.id;
      socket.join(roomId);
      if (query.type === "host") {
        console.log(query.userId, query.id, query.type);

        socket.on("disconnect", () => {
          console.log("HOST DISCONNECTED");
        });
      } else {
        console.log("JOIN JOINED", roomId);
      }
    }
  });

  return httpServer;
}
