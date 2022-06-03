import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "antd";
import { useSocket } from "utils/hooks/socket";
import { codes } from "../codes";
import { DataInterface, QuestionInterface } from "../common.interface";
import CenterComponent from "../components/Center";
import PollContent from "../components/Poll";

const { Title } = Typography;

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
      case codes.PACKET: {
        setQuestion(data.result);
        return;
      }
    }
  };

  let content = (
    <CenterComponent>
      <div>
        <Title level={3} style={{ margin: "auto" }}>
          Users joined: {userCount}
        </Title>
        <Title level={4} style={{ margin: "auto" }}>
          Waiting for host to begin poll
        </Title>
      </div>
    </CenterComponent>
  );
  if (question) {
    content = <PollContent question={question} isHost={false} />;
  }

  return content;
};

export default JoinComponent;
