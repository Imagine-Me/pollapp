import { getQuestion } from "./../controller/question.controller";
import { ExecuteFunctionResult } from "./index";
import { updateRedisRoom, getRedisRoom } from "./../redis/index";
import { codes } from "./codes";
const functions = {
  async setPollQuestion(args: any[]) {
    await updateRedisRoom(args[0], args[1]);
    return { shouldEmit: false } as ExecuteFunctionResult;
  },
  async createPollRoom(args: any[]) {
    await updateRedisRoom(args[0], args[1]);
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
  async addPoll(args: any[]) {
    await updateRedisRoom(args[0], args[1]);
    const result = await getRedisRoom(args[0]);
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
