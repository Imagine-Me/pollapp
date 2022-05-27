import { Button } from "antd";
import React, { useEffect } from "react";
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

interface Props {
  question: QuestionsType;
  questionRef: React.MutableRefObject<QuestionsType | undefined>;
  fetchQuestions: () => Promise<void>;
}

const Content = ({ question, questionRef, fetchQuestions }: Props) => {
  const [data, setData] = useState<QuestionsType>(question);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setData(question);
  }, [question]);
  
  useEffect(() => {
    if (questionRef) {
      questionRef.current = data;
    }
  }, [data]);

  const questionChange = (question: string | undefined) => {
    const tempData = { ...data };
    tempData.question = question ?? "";
    setData(tempData);
  };

  const setPreview = () => {
    setIsPreview((prev) => !prev);
  };

  const saveQuestion = async () => {
    // Validation
    const errors = [];
    if (data.question.length === 0) {
      errors.push("Question is required");
    }
    if (data.options.length < 2) {
      errors.push("Atleast 2 options are required.");
    }
    if (data.answer === undefined) {
      errors.push(
        "Select the right answer from options (use the radio button)"
      );
    }
    if (errors.length > 0) {
      notify(
        "Form error",
        <ul>
          {errors.map((error, id) => (
            <li key={`error_id_${id}`}>{error}</li>
          ))}
        </ul>
      );
      return;
    }
    try {
      setLoading(true);
      await axiosInstance.post("/question/create", data);
      await fetchQuestions();
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
