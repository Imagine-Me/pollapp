import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userState, UserProps } from "authentication/recoil/user";
import { useRecoilValue } from "recoil";

import notify from "../notify";
import BreadCrumpStyled from "./BreadCrump";
import SiderStyled from "./Sider";
import { axiosInstance } from "../../axios/instance";

export interface QuestionsType {
  id: number;
  question: string;
  options: string[];
  answer: number;
}

const Questions = () => {
  const [questions, setQuestion] = useState<QuestionsType[]>([]);
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
        setQuestion(data);
      } catch (e) {
        notify("Server error", `${e}`);
      }
    } else {
      notify("URL error", "Couldn't find the poll!");
    }
  };

  const breadCrumpProps = {
    pollId,
    title: "Hello title",
  };
  return (
    <>
      <BreadCrumpStyled {...breadCrumpProps} />
      <SiderStyled questions={questions} />
    </>
  );
};

export default Questions;
