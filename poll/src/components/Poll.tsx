import { Card, Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import { QuestionInterface } from "../common.interface";
import QuestionComponent from "./Questions";

const RowStyled = styled(Row)`
  min-height: 100vh;
`;

const CardStyled = styled(Card)`
  max-width: 600px;
  overflow-y: auto;
  margin: auto !important;
`;

const QuestionContent = styled((props) => <div {...props} />)`
  display: flex;
  flex-flow: column;
  > div:first-child {
    flex-grow: 1;
  }
`;

interface Props {
  question: QuestionInterface;
}

const PollContent = ({ question }: Props) => {
  return (
    <RowStyled align="middle">
      <Col xs={10}>Chart Content</Col>
      <Col flex="auto">
        <CardStyled>
          <QuestionContent>
            <QuestionComponent question={question} />
            <div>footer</div>
          </QuestionContent>
        </CardStyled>
      </Col>
    </RowStyled>
  );
};

export default PollContent;
