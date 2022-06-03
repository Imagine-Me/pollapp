import { createServer } from "http";
import { Server as Socket } from "socket.io";
import { Express } from "express";
import { authMiddleware } from "./../middlewares/authSocket.middleware";
import { getRoom } from "../controller/room.controller";
import { getQuestionIds } from "./../controller/question.controller";
import { codes } from "./codes";
import { getRedisRoom } from "../redis";
import pollFunctions from "./poll";

interface ConnectionQuery {
  id: string;
  type: "host" | "join";
  [x: string]: string;
}

interface DataInterface {
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

      const selectedQuestion = await getRedisRoom(roomId);
      if (query.type === "host") {
        // SEND QUESTION
        const questionList = await getQuestionList(query);
        if (selectedQuestion.selectedQuestion !== undefined) {
          questionList.result.selectedQuestion =
            selectedQuestion.selectedQuestion;
        }

        socket.emit("update", questionList);
      } else {
        if (selectedQuestion.question && selectedQuestion.options) {
          const result = {
            code: codes.PACKET,
            result: {
              question: selectedQuestion.question,
              options: selectedQuestion.options,
              id: selectedQuestion.id,
            },
          } as DataInterface;
          socket.emit("update", result);
        }
      }

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
    result: {
      questions: result,
    },
  } as DataInterface;
};
