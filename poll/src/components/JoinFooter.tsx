import React from "react";
import { Button, Col, Row } from "antd";

interface Props {
  canPoll: boolean;
}

const JoinFooter = ({ canPoll }: Props) => {
  return (
    <Row justify="end" style={{ marginTop: "10px" }}>
      <Button disabled={!canPoll} type="primary" size="large" block>
        Poll
      </Button>
    </Row>
  );
};

export default JoinFooter;
