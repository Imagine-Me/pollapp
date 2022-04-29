import UserModel from "./user.model";
import PollModel from "./poll.model";
import QuestionModel from "./question.model";

export default {
  user: {
    model: UserModel,
    hasMany: null,
  },
  poll: {
    model: PollModel,
    hasMany: "user",
  },
  question: {
    model: QuestionModel,
    hasMany: "poll",
  },
} as any;
