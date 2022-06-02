import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "utils/hooks/socket";
import { DataInterface } from "../common.interface";

const JoinComponent = () => {
  const params = useParams();
  const socket = useSocket({ id: params.pollId as string, type: "join" });

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("SOCKET CONNECTED");
      });

      socket.on("update", (data: DataInterface) => {
        console.log("SOMETHING HAPPENED", data);
      });
    }
  }, [socket]);
  return <h1>Join</h1>;
};

export default JoinComponent;
