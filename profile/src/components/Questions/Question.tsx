import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "utils/axios/instance";
import { notify } from "utils/notify";

import BreadCrumpStyled from "./QuestionContent/BreadCrump";
import SiderStyled from "./QuestionList/Sider";
import QuestionContent from "./QuestionContent";
import { Modal } from "antd";
import MDEditor from "@uiw/react-md-editor";

export interface QuestionsType {
  id?: number;
  question: string;
  options: string[];
  answer?: number;
}

const Questions = () => {
  const [showDrawer, setShowDrawer] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuestionsType[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
  const { pollId } = useParams();
  const questionRef = useRef<QuestionsType>();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    if (pollId) {
      try {
        const { data } = await axiosInstance.get(`/question/${pollId}`);
        setQuestions(data);
        questionRef.current = data[selectedQuestion];
      } catch (e) {
        notify("Server error", `${e}`);
      }
    } else {
      notify("URL error", "Couldn't find the poll!");
    }
  };

  const selectQuestion = (id: number) => {
    // check if user changed if question
    if (
      JSON.stringify(questionRef.current) !==
      JSON.stringify(questions[selectedQuestion])
    ) {
      Modal.confirm({
        title: "Caution",
        content:
          "You have made changes to the question. Are you sure you want to move to another question?",
        onOk() {
          setSelectedQuestion(id);
        },
      });
    } else {
      setSelectedQuestion(id);
    }
  };

  const addNewQuestion = () => {
    const data = {
      question: "",
      options: [],
      answer: undefined,
      pollId,
    };
    const questionLength = questions.length;
    setQuestions((prev) => {
      const temp = [...prev];
      temp.push(data);
      return temp;
    });
    setSelectedQuestion(questionLength);
  };

  const deleteQuestion = async (id: number | undefined) => {
    if (id) {
      await axiosInstance.delete(`/question/delete/${id}`);
      const questionLength = questions.length - 2;
      await fetchQuestions();
      setSelectedQuestion(questionLength);
    }
  };

  const showDialog = (id: number) => {
    const questionId = questions[id].id;
    if (id !== undefined && questionId !== undefined) {
      console.log("DELETING QUESTION", questions[id], id);
      Modal.error({
        title: "Are you sure you want to delete following question?",
        content: <MDEditor.Markdown source={questions[id].question} />,
        onOk: () => deleteQuestion(questionId),
      });
    }
  };

  const toggleDrawer = () => {
    setShowDrawer((prev) => !prev);
  };

  return (
    <>
      <BreadCrumpStyled pollId={pollId} />
      <QuestionContent
        toggleDrawer={toggleDrawer}
        showDrawer={showDrawer}
        addNewQuestion={addNewQuestion}
        question={questions[selectedQuestion]}
        fetchQuestions={fetchQuestions}
        questionRef={questionRef}
      />
      <SiderStyled
        showDrawer={showDrawer}
        selectedQuestion={selectedQuestion}
        setSelectQuestion={selectQuestion}
        addNewQuestion={addNewQuestion}
        questions={questions}
        deleteQuestion={showDialog}
      />
    </>
  );
};

export default Questions;
