import { Card, Col, RadioChangeEvent, Row, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import QuestionComponent from "./Questions";
import ChartComponent from "./Chart/Chart";
import { data } from "../recoil/data";

const { Title } = Typography;

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

const HeaderDiv = styled(Row)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 15px;
  > h3, h2 {
    margin: 0 !important;
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
  const { title, userCount } = useRecoilValue(data);

  const onSelectOption = (e: RadioChangeEvent) => {
    if (selectOption && e.target.value !== undefined) {
      selectOption(e.target.value);
    }
  };
  return (
    <>
      <HeaderDiv align="middle" justify="space-between">
        <Title level={2}>
          {`>`} {title}
        </Title>
        <Title level={3}>
          Users: {userCount}
        </Title>
      </HeaderDiv>
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
    </>
  );
};

export default PollContent;
