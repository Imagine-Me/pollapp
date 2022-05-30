import { Router } from "express";
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
    const result: any = await createRoom(data);
    res.send({ msg: "Room created", id: result[0].id });
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
