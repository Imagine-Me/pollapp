import { Button } from "antd";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { QuestionsType } from "../Question";
import Editor from "./Editor";
import { axiosInstance } from "../../../axios/instance";
import Options from "./Options";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import notify from "../../notify";

const TopButton = styled((props) => {
  const { isPreview, loading, saveQuestion, setPreview, ...styles } = props;
  return (
    <div {...styles}>
      <Button
        icon={isPreview ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        onClick={setPreview}
      >
        {isPreview ? "Edit" : "Preview"}
      </Button>
      <Button loading={loading} onClick={saveQuestion}>
        Save
      </Button>
    </div>
  );
})`
  position: absolute;
  right: 0;
  > button {
    &:last-child {
      margin-left: 10px;
    }
  }
  z-index: 1000;
`;

const Content = (props: QuestionsType) => {
  const [data, setData] = useState<QuestionsType>(props);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const questionChange = (question: string | undefined) => {
    const tempData = { ...data };
    tempData.question = question ?? "";
    setData(tempData);
  };

  const setPreview = () => {
    setIsPreview((prev) => !prev);
  };

  const saveQuestion = async () => {
    try {
      setLoading(true);
      await axiosInstance.post("/question/create", data);
      notify("Success", "Question updated", "success");
    } catch (e) {
      notify("Error", "Server error");
    }
    setLoading(false);
  };

  const editOption = (id: number, option: string | undefined) => {
    if (option) {
      const tempOptions = [...data.options];
      tempOptions[id] = option;
      setData((prev) => ({
        ...prev,
        options: tempOptions,
      }));
    }
  };

  const setAnswer = (answer: number) => {
    const tempData = { ...data };
    tempData.answer = answer;
    setData(tempData);
  };
  const addOption = () => {
    const tempOptions = [...data.options];
    tempOptions.push("");
    setData((prev) => ({
      ...prev,
      options: tempOptions,
    }));
  };
  const deleteOption = (id: number) => {
    const options = [...data.options];
    options.splice(id, 1);
    setData((prev) => ({
      ...prev,
      options,
    }));
  };

  return (
    <div>
      <TopButton
        setPreview={setPreview}
        saveQuestion={saveQuestion}
        loading={loading}
        isPreview={isPreview}
      />
      <Editor
        onSourceChange={questionChange}
        source={data.question}
        isPreview={isPreview}
        height="medium"
      />
      <Options
        options={data.options}
        answer={data.answer}
        isPreview={isPreview}
        editOption={editOption}
        setAnswer={setAnswer}
        addOption={addOption}
        deleteOption={deleteOption}
      />
    </div>
  );
};
export default Content;
