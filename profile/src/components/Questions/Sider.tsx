import { Card, Drawer, Typography } from "antd";
import React from "react";
import styled from "styled-components";

import { QuestionsType } from "./Question";

const { Title } = Typography;
interface Props {
  questions: QuestionsType[];
}

const QuestionCard = styled(Card)``;

const QuestionSider = (props: Props) => {
  const { questions } = props;
  return (
    <Drawer closeIcon visible mask={false} placement="right">
      {questions.map((question, id) => (
        <QuestionCard key={question.id}>
          <Title level={5}>
            {id + 1}. {question.question}
          </Title>
        </QuestionCard>
      ))}
    </Drawer>
  );
};

export default QuestionSider;
