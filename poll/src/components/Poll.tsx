import { Card, Col, RadioChangeEvent, Row, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import QuestionComponent from "./Questions";
import ChartComponent from "./Chart/Chart";
import { data } from "../recoil/data";

const { Title } = Typography;

const Container = styled((props) => <div {...props} />)`
  max-width: 600px;
  margin: 15px auto;
  min-width: 200px;
  width: 80%;
`;

const RowStyled = styled(Row)`
  min-height: calc(100vh - 70.5px);
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
  padding: 15px;
  > h4,
  h3 {
    margin: 0 !important;
  }
`;

interface Props {
  showChart?: boolean;
  footer: React.ReactNode;
  selectOption?: (ans: number) => void;
  questionLegend?: string;
}

const PollContent = ({
  footer,
  showChart = true,
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
        <Title level={3} ellipsis style={{ maxWidth: "60%" }}>
          {`>`} {title}
        </Title>
        <Title level={4}>Users: {userCount}</Title>
      </HeaderDiv>
      <RowStyled align="middle">
        {showChart && (
          <Col xs={24} lg={10}>
            <Container>
              <ChartComponent />
            </Container>
          </Col>
        )}
        <Col flex="auto">
          <CardStyled>
            <QuestionContent>
              <QuestionComponent
                onSelectOption={onSelectOption}
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
