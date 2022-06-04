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

export type QuestionChangeType = "next" | "prev";

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
          const tempAnswer = data.result.answer as number;
          const tempFooter = {
            isNext: tempQuestions.length > 1,
          } as Partial<FooterProps>;

          setQuestions(tempQuestions);
          if (tempSelectedQuestion !== undefined) {
            if (tempSelectedQuestion >= tempQuestions.length - 1) {
              tempFooter.isNext = false;
            }
            if (tempSelectedQuestion > 0) {
              tempFooter.isPrev = true;
            }
            setSelectedQuestion(tempSelectedQuestion);
            setStatus((prev) => ({ ...prev, isPollStarted: true }));
            if (tempAnswer !== undefined) {
              const updatedQuestions = tempQuestions.map((question, id) => {
                if (id === tempSelectedQuestion) {
                  return {
                    ...question,
                    answer: tempAnswer,
                  };
                }
                return question;
              });
              tempFooter.isRevealDisabled = true;
              setQuestions(updatedQuestions);
            }
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

  const changeQuestion = (type: QuestionChangeType) => {
    let tempQuestionSelected: number | null = null;
    if (type === "next") {
      if (selectedQuestion + 1 < questions.length) {
        tempQuestionSelected = selectedQuestion + 1;
      }
    } else {
      if (selectedQuestion - 1 >= 0) {
        tempQuestionSelected = selectedQuestion - 1;
      }
    }
    if (tempQuestionSelected !== null) {
      const isNext = tempQuestionSelected < questions.length - 1;
      const isPrev = tempQuestionSelected > 0;
      const isRevealDisabled =
        questions[tempQuestionSelected].answer !== undefined;
      setFooter((prev) => ({
        ...prev,
        isNext,
        isPrev,
        isRevealDisabled,
      }));
      setSelectedQuestion(tempQuestionSelected);
      const data = {
        selectedQuestion: tempQuestionSelected,
        ...questions[tempQuestionSelected],
      } as QuestionInterface & { selectedQuestion: number };
      socket.emit("room", {
        data: { result: data },
        execute: {
          function: "setPollQuestion",
          args: [roomId, data],
        },
      } as PacketInterface);
    }
  };

  const revealAnswer = () => {
    setFooter((prev) => ({
      ...prev,
      isLoading: true,
    }));
    socket.emit("room", {
      execute: {
        function: "getPollAnswer",
        args: [roomId, questions[selectedQuestion].id],
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
        footer={
          <HostFooter
            revealAnswer={revealAnswer}
            changeQuestion={changeQuestion}
            footer={footer}
          />
        }
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
