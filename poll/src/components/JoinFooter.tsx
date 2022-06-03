import React from "react";
import { Button, Col, Row } from "antd";

interface Props {
  canPoll: boolean;
  poll: () => void;
}

const JoinFooter = ({ canPoll, poll }: Props) => {
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
