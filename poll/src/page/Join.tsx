import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "antd";
import { useSocket } from "utils/hooks/socket";
import { LoadingOutlined } from "@ant-design/icons";
import { codes } from "../codes";
import {
  DataInterface,
  PacketInterface,
  QuestionInterface,
} from "../common.interface";
import CenterComponent from "../components/Center";
import PollContent from "../components/Poll";
import JoinFooter from "../components/JoinFooter";
import { useRecoilState } from "recoil";
import { data } from "../recoil/data";
import { JoinDataProps, joinUserData } from "../recoil/join";
import { getFromLocalStorage, updateLocalStorage } from "utils/localStorage";
import FixedAlert from "../components/FixedAlert";
import styled, { keyframes } from "styled-components";

const { Title } = Typography;
const fadeInOut = keyframes`
0% {
    opacity: 1;
}
50%{
    opacity: 0;
}
100%{
    opacity: 1;
}
`;
const AnimatedTitle = styled(Title)`
  animation: ${fadeInOut} 2s infinite;
  text-align: center;
`;

const JoinComponent = () => {
  const [isHostDisconnected, setIsHostDisconnected] = useState<boolean>(false);
  const [pollData, setPollData] = useRecoilState(data);
  const [joinData, setJoinData] = useRecoilState(joinUserData);
  const params = useParams();
  const roomId = params.pollId as string;
  const socket = useSocket({ id: roomId as string, type: "join" });

  useEffect(() => {
    const { question, ...localJoinData } = getFromLocalStorage(
      roomId
    ) as JoinDataProps & {
      question: QuestionInterface;
    };
    setJoinData((currVal) => ({
      ...currVal,
      ...localJoinData,
    }));
    setPollData((currVal) => ({
      ...currVal,
      isHost: false,
      question: question ?? {},
    }));

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
        console.log("SOCKET CONNECTED");
      });
      socket.on("update", (data: DataInterface) => {
        processData(data);
      });
    }
  }, [socket, pollData]);

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
        const question = data.result as QuestionInterface;
        if (question.id !== pollData.question.id) {
          const defaultJoinData = {
            isPolled: false,
            answer: null,
            showChart: false,
          } as JoinDataProps;
          updateLocalStorage(roomId, {
            question,
            ...defaultJoinData,
          });
          setJoinData((currVal) => ({
            ...currVal,
            ...defaultJoinData,
          }));
        }
        setPollData((currVal) => ({
          ...currVal,
          question,
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
      case codes.HOST_DISCONNECTED: {
        setIsHostDisconnected(true);
        return;
      }
      case codes.HOST_CONNECTED: {
        setIsHostDisconnected(false);
        return;
      }
    }
  };

  const selectOption = (ans: number) => {
    if (ans !== undefined) {
      setJoinData((currVal) => ({
        ...currVal,
        answer: ans,
      }));
    }
  };

  const poll = () => {
    const tempJoinData = {
      showChart: true,
      isPolled: true,
      answer: joinData.answer,
    } as JoinDataProps;
    setJoinData((currVal) => ({
      ...currVal,
      ...tempJoinData,
    }));
    updateLocalStorage(roomId, tempJoinData);
    const poll = [...(pollData.question.poll ?? [])];
    const index = joinData.answer ?? 1;
    poll[index - 1] = poll[index - 1] + 1;
    const temp = { ...pollData.question };
    temp.poll = poll;
    socket.emit("room", {
      execute: {
        function: "addPoll",
        args: [roomId, temp],
      },
    } as PacketInterface);
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
        <AnimatedTitle level={4}>Waiting for host to begin poll</AnimatedTitle>
      </div>
    </CenterComponent>
  );
  if (pollData.question && Object.keys(pollData.question).length > 0) {
    content = (
      <PollContent
        showChart={joinData.showChart || pollData.question.answer !== undefined}
        footer={<JoinFooter poll={poll} />}
        selectOption={selectOption}
      />
    );
  }

  return (
    <>
      {content}
      {isHostDisconnected && (
        <FixedAlert
          type="error"
          message={
            <>
              <LoadingOutlined spin style={{ marginRight: "15px" }} />
              Host disconnected. Waiting for host
            </>
          }
        />
      )}
    </>
  );
};

export default JoinComponent;
