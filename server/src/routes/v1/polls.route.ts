import { Router } from "express";
import { PollsModelType } from "../../models/poll.model";
import { createPoll, getPolls } from "../../controller/polls.controller";

const router = Router();

router.get("", async (req, res, next) => {
  const userId = res.locals.userId as number;
  try {
    const allPolls = await getPolls(userId);
    res.send(allPolls);
  } catch (e) {
    next(e);
  }
});

router.post("/create", async (req, res, next) => {
  const userId = res.locals.userId as number;
  const { body } = req;
  const poll = {
    userId,
    ...body,
  } as PollsModelType;
  try {
    const result = await createPoll(poll);
    res.send({ msg: "poll created", id: result.get("id") });
  } catch (e) {
    next(e);
  }
});

export default router;
