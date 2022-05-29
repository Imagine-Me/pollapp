import { Button, Card, Radio, RadioChangeEvent } from "antd";
import React from "react";
import styled from "styled-components";
import DeleteButton from "../DeleteButton";
import Editor from "./Editor";

const AnswerCard = styled(Card)`
  box-sizing: border-size;
  width: 100%;
  margin-top: 10px !important;
  border: 3px solid transparent !important;
  position: relative;
  .ant-card-body {
    padding: 10px !important;
  }
  &.active {
    border-color: #1890ff !important;
  }
  cursor: pointer;
  label.ant-radio-wrapper {
    width: 100%;
  }
  label.ant-radio-wrapper > span:last-child {
    width: 100%;
    margin-left: 15px;
  }
  label.ant-radio-wrapper > span.ant-radio {
    top: 50% !important;
    position: absolute !important;
    transform: translateY(-50%);
  }
`;

interface Props {
  options: string[];
  answer?: number;
  isPreview: boolean;
  editOption: (id: number, option: string | undefined) => void;
  setAnswer: (id: number) => void;
  addOption: () => void;
  deleteOption: (id: number) => void;
}

const Options = ({
  options,
  answer,
  isPreview,
  editOption,
  setAnswer,
  addOption,
  deleteOption,
}: Props) => {
  const onRadioChange = (e: RadioChangeEvent) => {
    setAnswer(e.target.value);
  };

  return (
    <Radio.Group
      style={{ width: "100%" }}
      onChange={onRadioChange}
      value={answer}
    >
      {options.map((option, id) => (
        <AnswerCard
          key={`options_key_${id}`}
          className={id + 1 === answer ? "active" : ""}
        >
          <Radio value={id + 1}>
            <div style={{ marginRight: "22px" }}>
              <Editor
                isPreview={isPreview}
                source={option}
                onSourceChange={(option: string | undefined) =>
                  editOption(id, option)
                }
              />
            </div>
          </Radio>
          <DeleteButton onClick={() => deleteOption(id)} />
        </AnswerCard>
      ))}
      <Button
        type="dashed"
        block
        style={{ margin: "10px 0" }}
        onClick={addOption}
        size="large"
      >
        Add option
      </Button>
    </Radio.Group>
  );
};

export default Options;
