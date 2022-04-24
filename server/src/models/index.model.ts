import UserModel from "./user.model";
import PollModel from "./poll.model";
import QuestionModel from "./question.model";

export default {
  question: {
    model: QuestionModel,
    hasMany: null,
  },
  poll: {
    model: PollModel,
    hasMany: "question",
  },
  user: {
    model: UserModel,
    hasMany: "poll",
  },
} as any;
