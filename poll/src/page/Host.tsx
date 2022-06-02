import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSocket } from "utils/hooks/socket";
import { codes } from "../codes";
import { DataInterface } from "../common.interface";
import CenterComponent from "../components/Center";
import UserCountComponent from "../components/UserCount";

interface StatusProps {
  isSocketConnected: boolean;
  isPollStarted: boolean;
}

interface QuestionInterface {
  id: number;
  question: string;
  options: string[];
}

const HostComponent = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [selectedQuestion, setSelectedQuestion] = useState<number | string>(0);
  const [questions, setQuestions] = useState<QuestionInterface[]>([]);
  const [status, setStatus] = useState<StatusProps>({
    isPollStarted: false,
    isSocketConnected: false,
  });
  const params = useParams();
  const socket = useSocket({ id: params.pollId as string, type: "host" });
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
      isPollStarted: userCount > 1,
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
        const tempSelectedQuestion = data.result.currentQuestion;
        setQuestions(tempQuestions);
        setSelectedQuestion(tempQuestions.findIndex((val) => val.id === tempSelectedQuestion));
        return;
      }
    }
  };

  let content = <>Please wait....</>;
  if (status.isSocketConnected) {
    content = (
      <Button
        size="large"
        disabled={!status.isPollStarted}
        style={{ margin: "auto", display: "block" }}
      >
        {status.isPollStarted ? "Start Poll" : "Waiting for atleast two users"}
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
