import { useState } from "react";
import { Socket, io } from "socket.io-client";
import { getTokenId } from "./tokenId";

interface Props {
  id: string;
  type: "host" | "join";
  [x: string]: string;
}

export function useSocket(query: Props) {
  const [socket] = useState<Socket>(
    io(process.env.API_URL ?? "", {
      query,
      auth: { token: getTokenId() },
    })
  );
  return socket;
}
