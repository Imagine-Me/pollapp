import { Router } from "express";
import { QuestionModelType } from "../../models/question.model";
import {
  createQuestion,
  getQuestions,
} from "../../controller/question.controller";

const router = Router();

router.get("/:pollId", async (req, res) => {
  const pollId = req.params.pollId;
  const result = await getQuestions(pollId);
  res.send(result);
});

router.post("/create", async (req, res) => {
  const { body } = req;
  await createQuestion(body as QuestionModelType);
  res.send({ msg: "question created" });
});

export default router;
