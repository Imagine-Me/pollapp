import { Button, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSocket } from "utils/hooks/socket";
import { codes } from "../codes";
import {
  DataInterface,
  PacketInterface,
  QuestionInterface,
} from "../common.interface";
import CenterComponent from "../components/Center";
import HostFooter from "../components/HostFooter";
import PollContent from "../components/Poll";

const { Title } = Typography;

interface StatusProps {
  isSocketConnected: boolean;
  isPollStarted: boolean;
  isUsersJoined: boolean;
}

export interface FooterProps {
  isLoading: boolean;
  isRevealDisabled: boolean;
  isPrev: boolean;
  isNext: boolean;
}

const HostComponent = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [footer, setFooter] = useState<FooterProps>({
    isLoading: false,
    isRevealDisabled: false,
    isPrev: false,
    isNext: false,
  });
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
      socket.removeAllListeners();
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
    }
  }, [socket, questions]);

  useEffect(() => {
    setStatus((prev) => ({
      ...prev,
      isUsersJoined: userCount > 1,
    }));
  }, [userCount]);

  const processData = useCallback(
    (data: DataInterface) => {
      switch (data.code) {
        case codes.USER_COUNT: {
          setUserCount(data.result - 1);
          return;
        }
        case codes.INITIAL_HOST_DATA: {
          const tempQuestions = data.result.questions as QuestionInterface[];
          const tempSelectedQuestion = data.result.selectedQuestion;
          setQuestions(tempQuestions);
          const tempFooter = {
            isPrev: false,
            isNext: tempQuestions.length > 1,
          } as Partial<FooterProps>;

          if (tempSelectedQuestion !== undefined) {
            if (tempSelectedQuestion >= tempQuestions.length - 1) {
              tempFooter.isNext = false;
            }
            if (tempSelectedQuestion > 0) {
              tempFooter.isPrev = false;
            }
            setSelectedQuestion(tempSelectedQuestion);
            setStatus((prev) => ({ ...prev, isPollStarted: true }));
          }
          setFooter((prev) => ({ ...prev, ...tempFooter }));
          return;
        }
        case codes.PACKET: {
          setFooter((prev) => ({
            ...prev,
            isLoading: false,
            isRevealDisabled: true,
          }));
          const result = data.result as QuestionInterface;
          const tempQuestions = questions.map((question) => {
            if (question.id === result.id) {
              return result;
            }
            return question;
          });
          setQuestions(tempQuestions);
          return;
        }
      }
    },
    [questions]
  );

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

  const revealAnswer = () => {
    setFooter((prev) => ({
      ...prev,
      isLoading: true,
    }));
    socket.emit("room", {
      execute: {
        function: "getPollAnswer",
        args: [questions[selectedQuestion].id],
      },
    } as PacketInterface);
  };

  let content = (
    <CenterComponent>
      <Title level={3}>Connecting.....</Title>
    </CenterComponent>
  );
  if (status.isSocketConnected && status.isPollStarted) {
    content = (
      <PollContent
        questionLegend={`${selectedQuestion + 1}/${questions.length}`}
        question={questions[selectedQuestion]}
        footer={<HostFooter revealAnswer={revealAnswer} footer={footer} />}
      />
    );
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
