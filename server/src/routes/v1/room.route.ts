import { Router } from "express";
import { createRoom } from "../../controller/room.controller";

const router = Router();

router.post("/create", async (req, res, next) => {
  const userId = res.locals.userId as string;
  const pollId = req.body.pollId;
  const data = {
    userId,
    pollId,
  };
  try {
    const result: any = await createRoom(data);
    res.send({ msg: "Room created", id: result[0].id });
  } catch (e) {
    next(e);
  }
});

export default router;
