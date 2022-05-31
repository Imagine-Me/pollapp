import { useState } from "react";
import { Socket, io } from "socket.io-client";

export function useSocket() {
  const [socket] = useState<Socket>(io(process.env.API_URL ?? ""));
  return socket;
}
