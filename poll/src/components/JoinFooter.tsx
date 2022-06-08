import React from "react";
import { Button, Col, Row } from "antd";
import { useRecoilValue } from "recoil";
import { joinUserData } from "../recoil/join";
import { data } from "../recoil/data";

interface Props {
  poll: () => void;
}

const JoinFooter = ({ poll }: Props) => {
  const { answer, showChart } = useRecoilValue(joinUserData);
  const { question } = useRecoilValue(data);
  const canPoll =
    answer !== null && question.answer === undefined && !showChart;
  return (
    <Row justify="end" style={{ marginTop: "10px" }}>
      <Button
        disabled={!canPoll}
        type="primary"
        size="large"
        onClick={poll}
        block
      >
        Poll
      </Button>
    </Row>
  );
};

export default JoinFooter;
