import { Card, Col, RadioChangeEvent, Row } from "antd";
import React, { useState } from "react";
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
  isHost?: boolean;
}

const PollContent = ({ question, isHost = true }: Props) => {
  const [answer, setAnswer] = useState();
  const onSelectOption = (e: RadioChangeEvent) => {
    setAnswer(e.target.value);
  };
  return (
    <RowStyled align="middle">
      <Col xs={10}>Chart Content</Col>
      <Col flex="auto">
        <CardStyled>
          <QuestionContent>
            <QuestionComponent
              question={question}
              isHost={isHost}
              onSelectOption={onSelectOption}
              value={answer}
            />
            <div>footer</div>
          </QuestionContent>
        </CardStyled>
      </Col>
    </RowStyled>
  );
};

export default PollContent;
