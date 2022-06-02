import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSocket } from "utils/hooks/socket";
import { codes } from "../codes";
import { DataInterface } from "../common.interface";

const HostComponent = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const params = useParams();
  const socket = useSocket({ id: params.pollId as string, type: "host" });
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("connected");
      });
      socket.on("update", (data: DataInterface) => {
        console.log("SOMETHING HAPPENING IN ROOM", data);
        processData(data);
      });
      socket.emit("room", { msg: "hello baby" });
    }
  }, [socket]);

  const processData = (data: DataInterface) => {
    switch (data.code) {
      case codes.USER_COUNT: {
        setUserCount(data.result - 1);
        return;
      }
    }
  };
  return <div>User joined {userCount}</div>;
};

export default HostComponent;
