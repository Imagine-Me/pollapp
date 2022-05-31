import { createServer } from "http";
import { Server as Socket } from "socket.io";
import { Express } from "express";

export default function initializeSocket(app: Express) {
  const httpServer = createServer(app);
  const io = new Socket(httpServer, {
    cors: { origin: "*" },
  });
  io.on("connection", () => {
    console.log("NEW CONNECTION");
  });
  return httpServer;
}
