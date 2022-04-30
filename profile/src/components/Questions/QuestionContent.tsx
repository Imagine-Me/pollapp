import React from "react";
import styled from "styled-components";
import { Typography, Button } from "antd";

import { QuestionsType } from "./Question";

const { Title } = Typography;

interface Props {
  question: QuestionsType;
  addNewQuestion: () => void;
}

const QuestionContent = styled((props: Props) => {
  const { question, addNewQuestion, ...styledProps } = props;

  return (
    <div {...styledProps}>
      <div>
        {question ? (
          question.question
        ) : (
          <>
            <Title level={3}>No questions added yet. Add now.</Title>
            <Button onClick={addNewQuestion} size="large" block type="dashed">
              Add question
            </Button>
          </>
        )}
      </div>
    </div>
  );
})`
  overflow-y: auto;
  margin: 30px 380px 30px 0;
  > div {
    max-width: 720px;
    margin: auto;
  }
`;

export default QuestionContent;
