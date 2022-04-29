import { Router } from "express";
import { QuestionModelType } from "../../models/question.model";
import {
  createQuestion,
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
    await createQuestion(body as QuestionModelType);
    res.send({ msg: "question created" });
  } catch (e) {
    next(e);
  }
});

export default router;
