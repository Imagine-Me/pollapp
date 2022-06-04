import React from "react";
import { Button, Col, Row } from "antd";
import { FooterProps, QuestionChangeType } from "../page/Host";

interface Props {
  revealAnswer: () => void;
  footer: FooterProps;
  changeQuestion: (type: QuestionChangeType) => void;
}

const HostFooter = ({ revealAnswer, footer, changeQuestion }: Props) => {
  return (
    <Row style={{ marginTop: "10px" }}>
      <Col span={8}>
        <Button
          type="primary"
          size="large"
          disabled={!footer.isPrev}
          onClick={() => changeQuestion("prev")}
        >
          Prev
        </Button>
      </Col>
      <Col span={8}>
        <Row justify="center">
          <Button
            type="primary"
            size="large"
            onClick={revealAnswer}
            disabled={footer.isRevealDisabled}
            loading={footer.isLoading}
          >
            Reveal Answer
          </Button>
        </Row>
      </Col>
      <Col span={8}>
        <Row justify="end">
          <Button
            type="primary"
            size="large"
            disabled={!footer.isNext}
            onClick={() => changeQuestion("next")}
          >
            Next
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default HostFooter;
