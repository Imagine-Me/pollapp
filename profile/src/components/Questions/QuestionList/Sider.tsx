import { LeftOutlined } from "@ant-design/icons";
import MDEditor from "@uiw/react-md-editor";
import { Button, Drawer, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import DeleteButton from "../DeleteButton";

import { QuestionsType } from "../Question";
import QuestionCard from "./QuestionCard";
interface Props {
  showDrawer: boolean;
  questions: QuestionsType[];
  selectedQuestion: number;
  setSelectQuestion: (id: number) => void;
  addNewQuestion: () => void;
  deleteQuestion: (id: number) => void;
}

const QuestionSider = (props: Props) => {
  const {
    showDrawer,
    questions,
    selectedQuestion,
    addNewQuestion,
    setSelectQuestion,
    deleteQuestion,
  } = props;
  return (
    <Drawer closeIcon visible={showDrawer} mask={false} placement="right">
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
