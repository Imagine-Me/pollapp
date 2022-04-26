import { Router } from "express";
import { PollsModelType } from "../../models/poll.model";
import { createPoll, getPolls } from "../../controller/polls.controller";

const router = Router();

router.get("", async (req, res) => {
  const userId = res.locals.userId as number;
  const allPolls = await getPolls(userId);
  res.send(allPolls);
});

router.post("/create", async (req, res) => {
  const userId = res.locals.userId as number;
  const { body } = req;
  const poll = {
    userId,
    ...body,
  } as PollsModelType;
  await createPoll(poll);
  res.send({ msg: "poll created" });
});

export default router;
