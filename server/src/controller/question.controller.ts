import { QuestionModelType } from "../models/question.model";
import { db } from "../db/index.db";

export const getQuestions = (pollId: string) => {
  return db.question.findAll({
    where: {
      pollId,
    },
  });
};

export const createQuestion = (data: QuestionModelType) => {
  return db.question.upsert({ ...data });
};
