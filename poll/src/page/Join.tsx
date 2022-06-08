import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "antd";
import { useSocket } from "utils/hooks/socket";
import { codes } from "../codes";
import { DataInterface, QuestionInterface } from "../common.interface";
import CenterComponent from "../components/Center";
import PollContent from "../components/Poll";
import JoinFooter from "../components/JoinFooter";
import { useRecoilState } from "recoil";
import { data } from "../recoil/data";

const { Title } = Typography;

const JoinComponent = () => {
  const [pollData, setPollData] = useRecoilState(data);
  const [showChart, setShowChart] = useState<boolean>(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const params = useParams();
  const socket = useSocket({ id: params.pollId as string, type: "join" });

  useEffect(() => {
    if (socket) {
      socket.removeAllListeners();
      socket.on("connect", () => {
        console.log("SOCKET CONNECTED");
      });
      socket.on("update", (data: DataInterface) => {
        console.log("SOMETHING HAPPENED", data);
        processData(data);
      });
    }
  }, [socket]);
  useEffect(() => {
    setPollData((currVal) => ({
      ...currVal,
      isHost: false,
    }));
  }, []);

  const processData = (data: DataInterface) => {
    switch (data.code) {
      case codes.USER_COUNT: {
        setPollData((currVal) => ({
          ...currVal,
          userCount: data.result - 1,
        }));
        return;
      }
      case codes.PACKET: {
        setPollData((currVal) => ({
          ...currVal,
          question: data.result,
        }));
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
  };

  const selectOption = (ans: number) => {
    if (ans !== undefined) {
      setAnswer(ans);
    }
  };

  const poll = () => {
    setShowChart(true);
  };

  let content = (
    <CenterComponent>
      <div>
        <Title level={1} style={{ textAlign: "center" }}>
          {pollData.title}
        </Title>
        <Title level={3} style={{ textAlign: "center" }}>
          Users joined: {pollData.userCount}
        </Title>
        <Title level={4} style={{ textAlign: "center" }}>
          Waiting for host to begin poll
        </Title>
      </div>
    </CenterComponent>
  );
  if (pollData.question && Object.keys(pollData.question).length > 0) {
    content = (
      <PollContent
        isHost={false}
        showChart={showChart || pollData.question.answer !== undefined}
        footer={
          <JoinFooter
            canPoll={
              answer !== null &&
              pollData.question.answer === undefined &&
              !showChart
            }
            poll={poll}
          />
        }
        answer={answer}
        selectOption={selectOption}
      />
    );
  }

  return content;
};

export default JoinComponent;
