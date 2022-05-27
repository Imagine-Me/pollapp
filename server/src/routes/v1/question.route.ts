import { Router } from "express";
import { QuestionModelType } from "../../models/question.model";
import {
  createQuestion,
  deleteQuestion,
  getQuestions,
} from "../../controller/question.controller";

const router = Router();

router.get("/:pollId", async (req, res, next) => {
  const pollId = req.params.pollId;
  try {
    const result = await getQuestions(pollId);
    res.send(result);
  } catch (e) {
    next(e);
  }
});

router.post("/create", async (req, res, next) => {
  const { body } = req;
  try {
    const question = await createQuestion(body as QuestionModelType);
    res.send({ msg: "question created", question });
  } catch (e) {
    next(e);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  const questionId = req.params.id;
  try {
    const result = await deleteQuestion(questionId);
    res.send({ msg: "question deleted", result });
  } catch (e) {
    next(e);
  }
});

export default router;
