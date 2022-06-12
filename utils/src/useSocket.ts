import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { getTokenId } from "./tokenId";

interface Props {
  id: string;
  type: "host" | "join";
  [x: string]: string;
}

export function useSocket(query: Props) {
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    setSocket(
      io(process.env.API_URL ?? "", {
        query,
        auth: { token: getTokenId() },
      })
    );
  }, []);
  return socket;
}
