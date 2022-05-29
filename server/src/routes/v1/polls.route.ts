import { Router } from "express";
import { PollsModelType } from "../../models/poll.model";
import {
  createPoll,
  deletePoll,
  getPoll,
  getPolls,
} from "../../controller/polls.controller";

const router = Router();

router.get("", async (req, res, next) => {
  const userId = res.locals.userId as string;
  try {
    const allPolls = await getPolls(userId);
    res.send(allPolls);
  } catch (e) {
    next(e);
  }
});
router.get("/:pollId", async (req, res, next) => {
  const userId = res.locals.userId as string;
  const pollId = req.params.pollId;
  try {
    const allPolls = await getPoll(userId, pollId);
    res.send(allPolls);
  } catch (e) {
    next(e);
  }
});

router.post("/create", async (req, res, next) => {
  const userId = res.locals.userId as string;
  const { body } = req;
  const poll = {
    userId,
    ...body,
  } as PollsModelType;
  try {
    const result: any = await createPoll(poll);
    res.send({ msg: "poll created", id: result[0].id });
  } catch (e) {
    next(e);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  const pollId = req.params.id;
  try {
    await deletePoll(pollId);
    res.send({ msg: "poll deleted" });
  } catch (e) {
    next(e);
  }
});

export default router;
