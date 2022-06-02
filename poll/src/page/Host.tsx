import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSocket } from "utils/hooks/socket";
import { codes } from "../codes";
import {
  DataInterface,
  PacketInterface,
  QuestionInterface,
} from "../common.interface";
import CenterComponent from "../components/Center";
import UserCountComponent from "../components/UserCount";

interface StatusProps {
  isSocketConnected: boolean;
  isPollStarted: boolean;
  isUsersJoined: boolean;
}

const HostComponent = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
  const [questions, setQuestions] = useState<QuestionInterface[]>([]);
  const [status, setStatus] = useState<StatusProps>({
    isPollStarted: false,
    isSocketConnected: false,
    isUsersJoined: false,
  });
  const params = useParams();
  const roomId = params.pollId as string;
  const socket = useSocket({ id: roomId, type: "host" });
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        setStatus((prev) => ({
          ...prev,
          isSocketConnected: true,
        }));
      });
      socket.on("update", (data: DataInterface) => {
        console.log("SOMETHING HAPPENING IN ROOM", data);
        processData(data);
      });
      socket.emit("room", { msg: "hello baby" });
    }
  }, [socket]);

  useEffect(() => {
    setStatus((prev) => ({
      ...prev,
      isUsersJoined: userCount > 1,
    }));
  }, [userCount]);

  const processData = (data: DataInterface) => {
    switch (data.code) {
      case codes.USER_COUNT: {
        setUserCount(data.result - 1);
        return;
      }
      case codes.INITIAL_HOST_DATA: {
        const tempQuestions = data.result.questions as QuestionInterface[];
        const tempSelectedQuestion = data.result.selectedQuestion;
        setQuestions(tempQuestions);
        if (tempSelectedQuestion !== undefined) {
          setSelectedQuestion(tempSelectedQuestion);
          setStatus((prev) => ({ ...prev, isPollStarted: true }));
        }
        return;
      }
    }
  };

  const startPoll = () => {
    console.log("CURRENT QUESTION IS", questions[selectedQuestion]);
    setStatus((prev) => ({ ...prev, isPollStarted: true }));
    const data = {
      selectedQuestion,
      ...questions[selectedQuestion],
    };
    socket.emit("room", {
      data: questions[selectedQuestion],
      execute: {
        function: "createPollRoom",
        args: [roomId, data],
      },
    } as PacketInterface);
  };

  let content = <>Please wait....</>;

  console.log(status);

  if (status.isSocketConnected && status.isPollStarted) {
    content = <>Poll started</>;
  } else if (status.isSocketConnected) {
    content = (
      <Button
        size="large"
        disabled={!status.isUsersJoined}
        style={{ margin: "auto", display: "block" }}
        onClick={startPoll}
      >
        {status.isUsersJoined ? "Start Poll" : "Waiting for atleast two users"}
      </Button>
    );
  }

  return (
    <CenterComponent>
      <div>
        <UserCountComponent userCount={userCount} />
        {content}
      </div>
    </CenterComponent>
  );
};

export default HostComponent;
