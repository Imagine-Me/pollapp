import { Button, Tooltip } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "utils/axios/instance";
import { notify } from "utils/notify";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { QuestionsType } from "../../../pages/Question";
import Editor from "./Editor";
import Options from "./Options";

const QuestionContainer = styled((props) => <div {...props} />)`
  position: relative;
  .tool-tip-button {
    position: absolute;
    right: 5px;
    top: 5px;
  }
`;

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
  display: flex;
  justify-content: end;
  margin-bottom: 10px;
  > button {
    &:last-child {
      margin-left: 10px;
    }
  }
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
    if (option !== undefined) {
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
      <QuestionContainer>
        <Editor
          onSourceChange={questionChange}
          source={data.question}
          isPreview={isPreview}
          height="large"
        />
        <Tooltip placement="top" title="Edit in Markdown format">
          <Button
            target="_blank"
            href="https://www.markdownguide.org/basic-syntax/"
            className="tool-tip-button"
            type="link"
            icon={<QuestionCircleOutlined />}
          ></Button>
        </Tooltip>
      </QuestionContainer>
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
