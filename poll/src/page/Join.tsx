import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "antd";
import { useSocket } from "utils/hooks/socket";
import { codes } from "../codes";
import { DataInterface, QuestionInterface } from "../common.interface";
import CenterComponent from "../components/Center";
import PollContent from "../components/Poll";
import JoinFooter from "../components/JoinFooter";

const { Title } = Typography;

const JoinComponent = () => {
  const [showChart, setShowChart] = useState<boolean>(false);
  const [answer, setAnswer] = useState<number | null>(null);
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

  const selectOption = (ans: number) => {
    if (ans !== undefined) {
      setAnswer(ans);
    }
  };

  let content = (
    <CenterComponent>
      <div>
        <Title level={3} style={{ textAlign: "center" }}>
          Users joined: {userCount}
        </Title>
        <Title level={4} style={{ textAlign: "center" }}>
          Waiting for host to begin poll
        </Title>
      </div>
    </CenterComponent>
  );
  if (question) {
    content = (
      <PollContent
        question={question}
        isHost={false}
        showChart={showChart}
        footer={<JoinFooter canPoll={answer !== null} />}
        answer={answer}
        selectOption={selectOption}
      />
    );
  }

  return content;
};

export default JoinComponent;
