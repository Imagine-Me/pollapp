import { getQuestion } from "./../controller/question.controller";
import { ExecuteFunctionResult } from "./index";
import { updateRedisRoom, createRedisRoom } from "./../redis/index";
import { codes } from "./codes";
const functions = {
  async setPollQuestion(args: any[]) {
    await updateRedisRoom(args[0], args[1]);
    return { shouldEmit: false } as ExecuteFunctionResult;
  },
  async createPollRoom(args: any[]) {
    await createRedisRoom(args[0], args[1]);
    return { shouldEmit: false } as ExecuteFunctionResult;
  },
  async getPollAnswer(args: any[]) {
    const result = await getQuestion(args[1]);
    await updateRedisRoom(args[0], result?.get({ plain: true }));
    return {
      shouldEmit: true,
      data: {
        result,
        code: codes.PACKET,
      },
    } as ExecuteFunctionResult;
  },
};

export default functions;
