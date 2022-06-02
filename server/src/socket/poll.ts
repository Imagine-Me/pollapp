import { ExecuteFunctionResult } from "./index";
import { updateRedisRoom, createRedisRoom } from "./../redis/index";
const functions = {
  async setPollQuestion(args: any[]) {
    await updateRedisRoom(args[0], args[1]);
    return { shouldEmit: false } as ExecuteFunctionResult;
  },
  async createPollRoom(args: any[]) {
    await createRedisRoom(args[0], args[1]);
    return { shouldEmit: false } as ExecuteFunctionResult;
  },
};

export default functions;
