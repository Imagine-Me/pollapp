import React from "react";
import styled from "styled-components";
import { Typography, Button } from "antd";

import { QuestionsType } from "./Question";
import Content from "./QuestionContent/Content";

const { Title } = Typography;

interface Props {
  question: QuestionsType;
  questionRef: React.MutableRefObject<QuestionsType | undefined>;
  addNewQuestion: () => void;
  fetchQuestions: () => Promise<void>;
}

const QuestionContent = styled((props: Props) => {
  const {
    question,
    addNewQuestion,
    fetchQuestions,
    questionRef,
    ...styledProps
  } = props;

  return (
    <div {...styledProps}>
      <div>
        {question ? (
          <Content
            question={question}
            questionRef={questionRef}
            fetchQuestions={fetchQuestions}
          />
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
  margin: 30px 350px 30px 0;
  position: relative;
  height: calc(100% - 35px);
  > div {
    max-width: 720px;
    margin: auto;
  }
`;

export default QuestionContent;
