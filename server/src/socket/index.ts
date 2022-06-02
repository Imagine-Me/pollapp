import { createServer } from "http";
import { Server as Socket } from "socket.io";
import { Express } from "express";
import { authMiddleware } from "./../middlewares/authSocket.middleware";
import { getRoom } from "../controller/room.controller";
import { getQuestionIds } from "./../controller/question.controller";
import { codes } from "./codes";

interface ConnectionQuery {
  id: string;
  type: "host" | "join";
  [x: string]: string;
}

interface DataInterface {
  code: number;
  result: any;
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
        // SEND QUESTION
        const questionList = await getQuestionList(query);
        io.to(roomId).emit("update", questionList);
      } else {
        console.log("JOIN JOINED", roomId);
      }

      socket.on("room", function (this: typeof socket, data) {
        const query = this.handshake.query as ConnectionQuery;
        if (query) {
          const result = {
            ...data,
            userData: query,
          };
          const roomId = query.id;
          socket.broadcast.to(roomId).emit("update", result);
        }
      });

      socket.on("disconnect", function (this: typeof socket) {
        const query = this.handshake.query as ConnectionQuery;
        if (query) {
          if (query.type === "host") {
            console.log("HOST DISCONNECTED");
          } else {
            console.log("JOIN DISCONNECTED");
          }
        }
      });
    }
  });

  return httpServer;
}

const getQuestionList = async (query: ConnectionQuery) => {
  let result: any = [];
  const { id, userId } = query;
  if (userId) {
    const room = await getRoom(id, userId);
    if (room && room.get("pollId")) {
      const questions = await getQuestionIds(room.get("pollId") as string);
      result = questions.map(({ id, question, options }: any) => ({
        id,
        question,
        options,
      }));
    }
  }
  return {
    code: codes.INITIAL_HOST_DATA,
    result,
  } as DataInterface;
};
