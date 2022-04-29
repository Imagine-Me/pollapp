import { db, sequelize } from "../db/index.db";
import { PollsModelType } from "../models/poll.model";

export const getPolls = (id: number) => {
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
  });
};

export const createPoll = (poll: PollsModelType) => {
  return db.poll.create({ ...poll });
};

export const truncatePolls = () => {
  return db.poll.destroy({ where: {} });
};
