import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "antd";
import { useSocket } from "utils/hooks/socket";
import { codes } from "../codes";
import {
  DataInterface,
  PacketInterface,
} from "../common.interface";
import CenterComponent from "../components/Center";
import PollContent from "../components/Poll";
import JoinFooter from "../components/JoinFooter";
import { useRecoilState } from "recoil";
import { data } from "../recoil/data";
import { joinUserData } from "../recoil/join";

const { Title } = Typography;

const JoinComponent = () => {
  const [pollData, setPollData] = useRecoilState(data);
  const [joinData, setJoinData] = useRecoilState(joinUserData);
  const params = useParams();
  const roomId = params.pollId as string;
  const socket = useSocket({ id: roomId as string, type: "join" });

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
        if (data.result.answer === undefined) {
          setJoinData((currVal) => ({
            ...currVal,
            isPolled: false,
            answer: null,
            showChart: false,
          }));
        }
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
      setJoinData((currVal) => ({
        ...currVal,
        answer: ans,
      }));
    }
  };

  const poll = () => {
    setJoinData((currVal) => ({
      ...currVal,
      showChart: true,
      isPolled: true,
    }));
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
        <Title level={4} style={{ textAlign: "center" }}>
          Waiting for host to begin poll
        </Title>
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

  return content;
};

export default JoinComponent;
