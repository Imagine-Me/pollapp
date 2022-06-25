import React from "react";
import styled from "styled-components";
import { Typography, Button } from "antd";

import { QuestionsType } from "../../pages/Question";
import Content from "./QuestionContent/Content";
import { LeftOutlined } from "@ant-design/icons";

const { Title } = Typography;

const DrawerButton = styled(Button)`
  position: absolute;
  right: 0;
  top: calc(50% - 60px);
  transform: translateY(-50%);
`;

interface Props {
  showDrawer: boolean;
  question: QuestionsType;
  questionRef: React.MutableRefObject<QuestionsType | undefined>;
  toggleDrawer: () => void;
  addNewQuestion: () => void;
  fetchQuestions: () => Promise<void>;
}

const QuestionContent = styled((props: Props) => {
  const {
    question,
    showDrawer,
    addNewQuestion,
    fetchQuestions,
    toggleDrawer,
    questionRef,
    ...styledProps
  } = props;

  return (
    <div {...styledProps}>
      {!showDrawer && (
        <DrawerButton icon={<LeftOutlined />} onClick={toggleDrawer} />
      )}
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
  transition: all 0.2s;
  ${(props) => `margin: 0 ${props.showDrawer ? "378px" : "0"} 0 0;`}
  overflow-y: auto;
  position: relative;
  height: calc(100% - 55px);
  padding: 0 30px 0 30px;
  > div {
    max-width: 720px;
    margin: auto;
  }
`;

export default QuestionContent;
