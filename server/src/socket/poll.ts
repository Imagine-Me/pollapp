import {
  getQuestion,
  getQuestionIds,
} from "./../controller/question.controller";
import { ConnectionQuery, DataInterface, ExecuteFunctionResult } from "./index";
import { updateRedisRoom, getRedisRoom } from "./../redis/index";
import { codes } from "./codes";
import { getRoom } from "../controller/room.controller";
import { getPoll } from "../controller/polls.controller";
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
    const question = await getQuestion(args[1]);
    await updateRedisRoom(args[0], question?.get({ plain: true }));
    const result = await getRedisRoom(args[0]);
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

export const onConnect = async (query: ConnectionQuery) => {
  const result: DataInterface[] = [];
  const roomId = query.id;
  const selectedQuestion = await getRedisRoom(roomId);
  let roomTitle = selectedQuestion.roomTitle;
  if (query.type === "host") {
    // CHECK IF ROOM TITLE IS SET OR NOT
    if (selectedQuestion.roomTitle === undefined && query.userId) {
      roomTitle = await getRoomTitle(roomId, query.userId);
    }
    // SEND QUESTION
    const questionList = await getQuestionList(query);
    if (selectedQuestion.selectedQuestion !== undefined) {
      questionList.result.selectedQuestion = selectedQuestion.selectedQuestion;
      questionList.result.answer = selectedQuestion.answer;
      questionList.result.poll = selectedQuestion.poll;
    }
    result.push(questionList);
  } else {
    if (selectedQuestion.question && selectedQuestion.options) {
      result.push({
        code: codes.PACKET,
        result: selectedQuestion,
      } as DataInterface);
    }
  }
  if (roomTitle) {
    result.push({
      code: codes.META,
      result: { title: roomTitle },
    } as DataInterface);
  }
  return result;
};

const getRoomTitle = async (id: string, userId: string) => {
  const roomDetails = await getRoom(id, userId);
  const pollId = roomDetails?.get("pollId");
  if (pollId) {
    const pollDetails = await getPoll(userId, pollId as string);
    await updateRedisRoom(id, {
      roomTitle: pollDetails?.get("title"),
    });
    return pollDetails?.get("title");
  }
  return "";
};

const getQuestionList = async (query: ConnectionQuery) => {
  let result: any = [];
  const { id, userId } = query;
  if (userId) {
    const room = await getRoom(id, userId);
    if (room && room.get("pollId")) {
      const questions = await getQuestionIds(room.get("pollId") as string);
      result = questions.map(({ id, question, options }: any) => ({
        id,
        question,
        options,
      }));
    }
  }
  return {
    code: codes.INITIAL_HOST_DATA,
    result: {
      questions: result,
    },
  } as DataInterface;
};
