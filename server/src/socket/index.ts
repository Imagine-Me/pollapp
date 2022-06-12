import { createServer } from "http";
import { Server as Socket } from "socket.io";
import { Express } from "express";
import { authMiddleware } from "./../middlewares/authSocket.middleware";
import { codes } from "./codes";
import pollFunctions, { onConnect } from "./poll";

export interface ConnectionQuery {
  id: string;
  type: "host" | "join";
  [x: string]: string;
}

export interface DataInterface {
  code: number;
  result: any;
}

const appFunctions = {
  ...pollFunctions,
};
interface PacketInterface {
  execute: {
    function: keyof typeof appFunctions;
    args: any[];
  };
  data: any;
}

export interface ExecuteFunctionResult {
  shouldEmit: boolean;
  data?: Record<string, any>;
}

export default function initializeSocket(app: Express) {
  const httpServer = createServer(app);
  const io = new Socket(httpServer, {
    cors: { origin: "*" },
  });

  // MIDDLEWARES
  io.use(authMiddleware);

  io.on("connection", async (socket) => {
    const query = socket.handshake.query as ConnectionQuery;
    if (query) {
      const roomId = query.id;
      socket.join(roomId);
      // SEND USER COUNT
      const userCount = io.sockets.adapter.rooms.get(roomId)?.size;
      io.to(roomId).emit("update", {
        code: codes.USER_COUNT,
        result: userCount,
      } as DataInterface);

      if (query.type === "host") {
        io.to(roomId).emit("update", {
          code: codes.HOST_CONNECTED,
        } as DataInterface);
      }

      const initialConnection = await onConnect(query);
      initialConnection.forEach((each) => {
        socket.emit("update", each);
      });

      socket.on(
        "room",
        async function (this: typeof socket, packet: PacketInterface) {
          const query = this.handshake.query as ConnectionQuery;
          const { execute, data } = packet;
          if (query) {
            if (data) {
              const result = {
                ...data,
                code: codes.PACKET,
              };
              const roomId = query.id;
              socket.broadcast.to(roomId).emit("update", result);
            }
            if (execute) {
              const executeResult = await appFunctions[execute.function](
                execute.args
              );
              if (executeResult.shouldEmit) {
                io.to(roomId).emit("update", executeResult.data);
              }
            }
          }
        }
      );

      socket.on("disconnect", function (this: typeof socket) {
        const query = this.handshake.query as ConnectionQuery;
        const userCount = io.sockets.adapter.rooms.get(roomId)?.size;
        io.to(roomId).emit("update", {
          code: codes.USER_COUNT,
          result: userCount,
        } as DataInterface);
        if (query) {
          if (query.type === "host") {
            io.to(roomId).emit("update", {
              code: codes.HOST_DISCONNECTED,
            } as DataInterface);
          }
        }
      });
    }
  });

  return httpServer;
}
