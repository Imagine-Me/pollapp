import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userState, UserProps } from "authentication/recoil/user";
import { useRecoilValue } from "recoil";

import notify from "../notify";
import BreadCrumpStyled from "./QuestionContent/BreadCrump";
import SiderStyled from "./QuestionList/Sider";
import { axiosInstance } from "../../axios/instance";
import QuestionContent from "./QuestionContent";

export interface QuestionsType {
  id?: number;
  question: string;
  options: string[];
  answer?: number;
}

const Questions = () => {
  const [questions, setQuestions] = useState<QuestionsType[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
  const { pollId } = useParams();
  const user = useRecoilValue<UserProps>(userState);

  useEffect(() => {
    axiosInstance.interceptors.request.use(function (config) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${user.tokenId}`;
      return config;
    });
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    if (pollId) {
      try {
        const { data } = await axiosInstance.get(`/question/${pollId}`);
        setQuestions(data);
      } catch (e) {
        notify("Server error", `${e}`);
      }
    } else {
      notify("URL error", "Couldn't find the poll!");
    }
  };

  const selectQuestion = (id: number) => {
    setSelectedQuestion(id);
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

  return (
    <>
      <BreadCrumpStyled pollId={pollId} />
      <QuestionContent
        addNewQuestion={addNewQuestion}
        question={questions[selectedQuestion]}
        fetchQuestions={fetchQuestions}
      />
      <SiderStyled
        selectedQuestion={selectedQuestion}
        setSelectQuestion={selectQuestion}
        addNewQuestion={addNewQuestion}
        questions={questions}
        deleteQuestion={deleteQuestion}
      />
    </>
  );
};

export default Questions;
