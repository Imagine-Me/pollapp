import { Card, Col, RadioChangeEvent, Row } from "antd";
import React from "react";
import styled from "styled-components";
import { QuestionInterface } from "../common.interface";
import QuestionComponent from "./Questions";
import ChartComponent from "./Chart/Chart";

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
  isHost?: boolean;
  showChart?: boolean;
  footer: React.ReactNode;
  answer?: number | null;
  selectOption?: (ans: number) => void;
  questionLegend?: string;
}

const PollContent = ({
  footer,
  isHost = true,
  showChart = true,
  answer,
  selectOption,
  questionLegend,
}: Props) => {
  const onSelectOption = (e: RadioChangeEvent) => {
    if (selectOption && e.target.value !== undefined) {
      selectOption(e.target.value);
    }
  };
  return (
    <RowStyled align="middle">
      {showChart && (
        <Col xs={10}>
          <ChartComponent />
        </Col>
      )}
      <Col flex="auto">
        <CardStyled>
          <QuestionContent>
            <QuestionComponent
              isHost={isHost}
              onSelectOption={onSelectOption}
              value={answer}
              questionLegend={questionLegend}
              showSelected={showChart}
            />
            {footer}
          </QuestionContent>
        </CardStyled>
      </Col>
    </RowStyled>
  );
};

export default PollContent;
