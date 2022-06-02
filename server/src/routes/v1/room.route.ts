import { Router } from "express";
import {
  getQuestionsLength,
  getFirstQuestionId,
} from "../../controller/question.controller";
import { createRedisRoom } from "./../../redis/index";
import { createRoom, joinRoom } from "../../controller/room.controller";

const router = Router();

router.post("/create", async (req, res, next) => {
  const userId = res.locals.userId as string;
  const pollId = req.body.pollId;
  const data = {
    userId,
    pollId,
  };
  try {
    const questionLength = await getQuestionsLength(pollId);
    if (questionLength.count > 0) {
      const result: any = await createRoom(data);
      const question = await getFirstQuestionId(pollId);
      if (question) {
        const questionId = question.get("id");
        await createRedisRoom(result[0].id, {
          question: questionId,
        });
      } else {
        res.send({ status: false, msg: "Couldn't create room" });
      }
      res.send({ status: true, msg: "Room created", id: result[0].id });
    } else {
      res.send({ msg: "Add atleast one question", status: false });
    }
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const userId = res.locals.userId as string;
  try {
    const result = await joinRoom(req.params.id);
    if (result?.get("userId") === userId) {
      res.send({ type: "host" });
    } else {
      res.send({ type: "join" });
    }
  } catch (e) {
    next(e);
  }
});

export default router;
