import { QuestionInterface } from "./../common.interface";
import { atom } from "recoil";

interface PollDataProps {
  userCount: number;
  question: QuestionInterface;
  title: string;
  isHost: boolean;
}

export const data = atom({
  key: "poll",
  default: {
    isHost: true,
    userCount: 0,
    question: {},
    title: "",
  } as PollDataProps,
});
