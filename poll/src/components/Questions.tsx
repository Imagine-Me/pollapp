import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { QuestionInterface } from "../common.interface";
import styled from "styled-components";
import { Card, Radio } from "antd";

const AnswerCard = styled(Card)`
  box-sizing: border-size;
  width: 100%;
  margin-top: 10px !important;
  position: relative;
  .ant-card-body {
    padding: 10px !important;
  }
  &.active {
    border-color: #00ff00 !important;
  }
  label.ant-radio-wrapper {
    width: 100%;
  }
  label.ant-radio-wrapper > span:last-child {
    width: 100%;
    margin-left: 15px;
    position: absolute;
  }
  label.ant-radio-wrapper > span.ant-radio {
    top: 50% !important;
    position: absolute !important;
    transform: translateY(-50%);
  }
`;

interface Props {
  isHost?: boolean;
  question: QuestionInterface;
}

const QuestionComponent = ({ question, isHost = true }: Props) => {
  return (
    <>
      <MDEditor.Markdown source={question.question} />
      <Radio.Group>
        {question.options.map((option, id) => (
          <AnswerCard key={`option_id_${id}`}>
            {isHost ? (
              <div style={{ marginRight: "22px" }}>
                <MDEditor.Markdown source={option} />
              </div>
            ) : (
              <Radio value={id + 1}>
                <div style={{ marginRight: "22px" }}>
                  <MDEditor.Markdown source={option} />
                </div>
              </Radio>
            )}
          </AnswerCard>
        ))}
      </Radio.Group>
    </>
  );
};

export default QuestionComponent;
