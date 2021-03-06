import { Button, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CopyOutlined, LoadingOutlined } from "@ant-design/icons";

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
import { data } from "../recoil/data";
import copyToClipboard from "../utils/copyUrl";
import FixedAlert from "../components/FixedAlert";

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
  const [pollData, setPollData] = useRecoilState(data);
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
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

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
        processData(data);
      });
    }
  }, [socket, questions]);

  useEffect(() => {
    setStatus((prev) => ({
      ...prev,
      isUsersJoined: pollData.userCount > 1,
    }));
  }, [pollData.userCount]);

  useEffect(() => {
    if (selectedQuestion < questions.length) {
      setPollData((currVal) => ({
        ...currVal,
        question: questions[selectedQuestion],
      }));
    }
  }, [questions, selectedQuestion]);

  const processData = useCallback(
    (data: DataInterface) => {
      switch (data.code) {
        case codes.USER_COUNT: {
          setPollData((currVal) => ({
            ...currVal,
            userCount: data.result - 1,
          }));
          return;
        }
        case codes.INITIAL_HOST_DATA: {
          const temp = data.result.questions as QuestionInterface[];
          let poll = data.result.poll;
          const tempSelectedQuestion = data.result.selectedQuestion;
          const tempAnswer = data.result.answer as number;
          const tempFooter = {} as Partial<FooterProps>;
          const tempQuestions = temp.map((val, id) => {
            const temp = {
              ...val,
            };
            if (poll && id === tempSelectedQuestion) {
              temp.poll = poll;
              if (tempAnswer !== undefined) {
                temp.answer = tempAnswer;
                tempFooter.isRevealDisabled = true;
              }
            } else {
              temp.poll = Array.from({ length: val.options.length }, () => 0);
            }
            return temp;
          });

          tempFooter.isNext = tempQuestions.length > 1;

          setQuestions(tempQuestions);
          if (tempSelectedQuestion !== undefined) {
            setPollData((currVal) => ({
              ...currVal,
              question: tempQuestions[tempSelectedQuestion],
            }));
            if (tempSelectedQuestion >= tempQuestions.length - 1) {
              tempFooter.isNext = false;
            }
            if (tempSelectedQuestion > 0) {
              tempFooter.isPrev = true;
            }
            setSelectedQuestion(tempSelectedQuestion);
            setStatus((prev) => ({ ...prev, isPollStarted: true }));
          }
          setFooter((prev) => ({ ...prev, ...tempFooter }));
          return;
        }
        case codes.PACKET: {
          const result = data.result as QuestionInterface;
          if (result.answer !== undefined) {
            setFooter((prev) => ({
              ...prev,
              isLoading: false,
              isRevealDisabled: true,
            }));
          }
          const tempQuestions = questions.map((question) => {
            if (question.id === result.id) {
              return result;
            }
            return question;
          });
          setQuestions(tempQuestions);
          return;
        }
        case codes.META: {
          setPollData((currVal) => ({
            ...currVal,
            title: data.result.title,
          }));
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
      ...pollData.question,
    };
    socket.emit("room", {
      data: { result: pollData.question },
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
        args: [roomId, pollData.question.id],
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
          <Title
            level={1}
            style={{ textAlign: "center"}}
          >
            {pollData.title}
          </Title>
          <Title level={3} style={{ textAlign: "center" }}>
            Users joined : {pollData.userCount}
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
          <Button
            icon={<CopyOutlined />}
            type="text"
            onClick={copyToClipboard}
            style={{ margin: "auto", display: "block", marginTop: "15px" }}
          >
            Copy poll url and share to your friends
          </Button>
        </div>
      </CenterComponent>
    );
  }

  return (
    <>
      {content}
      {!status.isUsersJoined && (
        <FixedAlert
          type="info"
          message={
            <>
              <LoadingOutlined spin style={{ marginRight: "15px" }} />
              There is only {pollData.userCount} user
            </>
          }
        />
      )}{" "}
    </>
  );
};

export default HostComponent;
