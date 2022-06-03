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

export const getQuestionIds = (pollId: string) => {
  return db.question.findAll({
    where: { pollId },
    attributes: ["id", "question", "options"],
    order: [["createdAt", "ASC"]],
    raw: true,
  });
};

export const getQuestionsLength = (pollId: string) => {
  return db.question.findAndCountAll({
    where: {
      pollId,
    },
  });
};

export const getFirstQuestionId = (pollId: string) => {
  return db.question.findOne({
    where: {
      pollId,
    },
    attributes: ["id"],
  });
};

export const getQuestion = (id: string) => {
  return db.question.findOne({
    where: {
      id,
    },
    attributes: ["id", "question", "options", "answer"],
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
