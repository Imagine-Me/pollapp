import { db, sequelize } from "../db/index.db";
import { PollsModelType } from "../models/poll.model";

export const getPolls = (id: string) => {
  return db.poll.findAll({
    attributes: {
      include: [
        [
          sequelize.literal(
            '(SELECT COUNT("questions"."id") FROM "questions" WHERE "questions"."pollId" = "poll"."id")'
          ),
          "questionCount",
        ],
      ],
    },
    where: { userId: id },
    order: [["createdAt", "DESC"]],
  });
};

export const getPoll = (id: string, pollId: string) => {
  return db.poll.findOne({
    where: {
      userId: id,
      id: pollId,
    },
  });
};

export const createPoll = (poll: PollsModelType) => {
  return db.poll.upsert({ ...poll });
};

export const truncatePolls = () => {
  return db.poll.destroy({ where: {} });
};
