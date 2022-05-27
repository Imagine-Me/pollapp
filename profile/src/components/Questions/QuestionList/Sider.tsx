import { Button, Drawer, Typography } from "antd";
import React from "react";
import DeleteButton from "../DeleteButton";

import { QuestionsType } from "../Question";
import QuestionCard from "./QuestionCard";

const { Title } = Typography;
interface Props {
  questions: QuestionsType[];
  selectedQuestion: number;
  setSelectQuestion: (id: number) => void;
  addNewQuestion: () => void;
  deleteQuestion: (id: number | undefined) => Promise<void>;
}

const QuestionSider = (props: Props) => {
  const { questions } = props;
  return (
    <Drawer closeIcon visible mask={false} placement="right">
      {questions.map((question, id) => (
        <QuestionCard
          key={`question_card_${id}`}
          bordered={false}
          className={props.selectedQuestion === id ? "selected" : ""}
          onClick={() => props.setSelectQuestion(id)}
        >
          <Title level={5}>
            {id + 1}. {question.question}
          </Title>
          <DeleteButton onClick={() => props.deleteQuestion(question.id)} />
        </QuestionCard>
      ))}
      <Button onClick={props.addNewQuestion} size="large" block type="dashed">
        Add question
      </Button>
    </Drawer>
  );
};

export default QuestionSider;
