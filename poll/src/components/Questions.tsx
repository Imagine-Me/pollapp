import React from "react";
import MDEditor from "@uiw/react-md-editor";
import styled from "styled-components";
import { Card, Radio, RadioChangeEvent, Row, Typography } from "antd";
import { useRecoilValue } from "recoil";
import { data } from "../recoil/data";

const AnswerCard = styled(Card)`
  box-sizing: border-size;
  width: 100%;
  margin-top: 10px !important;
  position: relative;
  border-width: 2px;
  .ant-card-body {
    padding: 10px !important;
  }
  &.success {
    border-color: #00ff00 !important;
  }
  &.info {
    border-color: #785df0 !important;
  }
  &.error {
    border-color: #ff0000 !important;
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

const DivContainer = styled((props) => <div {...props} />)`
  display: flex;
  align-items: center;
  >div: first-child {
    font-weight: bold;
  }
`;

const ASCII_START_CODE = 65;

interface Props {
  isHost?: boolean;
  onSelectOption?: (e: RadioChangeEvent) => void;
  value?: any;
  questionLegend?: string;
  showSelected?: boolean;
}

const QuestionComponent = ({
  isHost = true,
  onSelectOption,
  value,
  questionLegend,
  showSelected,
}: Props) => {
  const { question } = useRecoilValue(data);

  const getClassName = (id: number) => {
    if (showSelected && question.answer !== undefined) {
      if (id + 1 === question.answer) {
        return "success";
      } else {
        if (id + 1 === value) return "error";
      }
    }
    return "";
  };
  return (
    <>
      <Row justify="end">
        <Typography.Title level={5}>{questionLegend}</Typography.Title>
      </Row>
      <MDEditor.Markdown source={question.question} />
      <Radio.Group onChange={onSelectOption} value={value}>
        {question.options.map((option, id) => (
          <AnswerCard key={`option_id_${id}`} className={getClassName(id)}>
            {isHost || question.answer !== undefined ? (
              <DivContainer>
                <div>
                  {String.fromCharCode(ASCII_START_CODE + id)}.&nbsp;&nbsp;
                </div>
                <div style={{ marginRight: "22px" }}>
                  <MDEditor.Markdown source={option} />
                </div>
              </DivContainer>
            ) : (
              <DivContainer>
                <div>
                  {String.fromCharCode(ASCII_START_CODE + id)}.&nbsp;&nbsp;
                </div>
                <Radio value={id + 1}>
                  <div style={{ marginRight: "22px" }}>
                    <MDEditor.Markdown source={option} />
                  </div>
                </Radio>
              </DivContainer>
            )}
          </AnswerCard>
        ))}
      </Radio.Group>
    </>
  );
};

export default QuestionComponent;
