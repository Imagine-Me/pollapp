import { Router } from "express";
import { createUser } from "../../controller/user.controller";
import { UserModelType } from "../../models/user.model";

const router = Router();
router.post("/add", async (req, res) => {
  const body: UserModelType = req.body;
  // const result = await createUser(body);
  return res.send("User created");
});


export default router;