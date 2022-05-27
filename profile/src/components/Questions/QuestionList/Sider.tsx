import MDEditor from "@uiw/react-md-editor";
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
  deleteQuestion: (id: number) => void;
}

const QuestionSider = (props: Props) => {
  const {
    questions,
    selectedQuestion,
    addNewQuestion,
    setSelectQuestion,
    deleteQuestion,
  } = props;
  return (
    <Drawer closeIcon visible mask={false} placement="right">
      {questions.map((question, id) => (
        <QuestionCard
          key={`question_card_${id}`}
          bordered={false}
          className={selectedQuestion === id ? "selected" : ""}
          onClick={() => setSelectQuestion(id)}
        >
          <MDEditor.Markdown
            source={question.question}
            style={{ padding: "15px" }}
          />
          <DeleteButton onClick={() => deleteQuestion(id)} />
        </QuestionCard>
      ))}
      <Button onClick={addNewQuestion} size="large" block type="dashed">
        Add question
      </Button>
    </Drawer>
  );
};

export default QuestionSider;
