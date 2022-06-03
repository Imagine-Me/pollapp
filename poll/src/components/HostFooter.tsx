import React from "react";
import { Button, Col, Row } from "antd";
import { FooterProps } from "../page/Host";

interface Props {
  revealAnswer: () => void;
  footer: FooterProps;
}

const HostFooter = ({ revealAnswer, footer }: Props) => {
  return (
    <Row style={{ marginTop: "10px" }}>
      <Col span={8}>
        <Button type="primary" size="large" disabled={!footer.isPrev}>
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
          <Button type="primary" size="large"disabled={!footer.isNext}>
            Next
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default HostFooter;
