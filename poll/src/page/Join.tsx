import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "utils/hooks/socket";
import { codes } from "../codes";
import { DataInterface, QuestionInterface } from "../common.interface";
import CenterComponent from "../components/Center";
import UserCountComponent from "../components/UserCount";

const JoinComponent = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [question, setQuestion] = useState<QuestionInterface>();
  const params = useParams();
  const socket = useSocket({ id: params.pollId as string, type: "join" });

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("SOCKET CONNECTED");
      });
      socket.on("update", (data: DataInterface) => {
        console.log("SOMETHING HAPPENED", data);
        processData(data);
      });
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

  return (
    <CenterComponent>
      <UserCountComponent userCount={userCount} />
    </CenterComponent>
  );
};

export default JoinComponent;
