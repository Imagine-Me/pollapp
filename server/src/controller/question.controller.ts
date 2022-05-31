import { QuestionModelType } from "../models/question.model";
import { db } from "../db/index.db";

export const getQuestions = (pollId: string) => {
  return db.question.findAll({
    where: {
      pollId,
    },
    order: [["createdAt", "ASC"]],
  });
};

export const getQuestionsLength = (pollId: string) => {
  return db.question.findAndCountAll({
    where: {
      pollId,
    },
  });
};

export const createQuestion = (data: QuestionModelType) => {
  return db.question.upsert({ ...data });
};

export const deleteQuestion = (id: string) => {
  return db.question.destroy({ where: { id } });
};

export const truncateQuestions = () => {
  return db.question.destroy({ where: {} });
};
