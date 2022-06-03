import { Button, Typography } from "antd";
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
import PollContent from "../components/Poll";
import UserCountComponent from "../components/UserCount";

const { Title } = Typography;

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
          console.log(tempSelectedQuestion);
          setSelectedQuestion(tempSelectedQuestion);
          setStatus((prev) => ({ ...prev, isPollStarted: true }));
        }
        return;
      }
    }
  };

  const startPoll = () => {
    setStatus((prev) => ({ ...prev, isPollStarted: true }));
    const data = {
      selectedQuestion,
      ...questions[selectedQuestion],
    };
    socket.emit("room", {
      data: { result: questions[selectedQuestion] },
      execute: {
        function: "createPollRoom",
        args: [roomId, data],
      },
    } as PacketInterface);
  };

  let content = (
    <CenterComponent>
      <Title level={3}>Connecting.....</Title>
    </CenterComponent>
  );
  if (status.isSocketConnected && status.isPollStarted) {
    content = <PollContent question={questions[selectedQuestion]} />;
  } else if (status.isSocketConnected) {
    content = (
      <CenterComponent>
        <div>
          <Title level={2} style={{ textAlign: "center" }}>
            Users joined : {userCount}
          </Title>
          <Button
            size="large"
            disabled={!status.isUsersJoined}
            style={{ margin: "auto", display: "block" }}
            onClick={startPoll}
          >
            {status.isUsersJoined
              ? "Start Poll"
              : "Waiting for atleast two users"}
          </Button>
        </div>
      </CenterComponent>
    );
  }

  return content;
};

export default HostComponent;
