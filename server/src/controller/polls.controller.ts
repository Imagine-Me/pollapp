import { Op } from "sequelize";
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
    where: { [Op.or]: [{ userId: id }, { type: "public" }] },
    order: [["createdAt", "DESC"]],
  });
};

export const getPoll = (id: string, pollId: string) => {
  return db.poll.findOne({
    where: {
      [Op.or]: [{ userId: id }, { type: "public" }],
      id: pollId,
    },
  });
};

export const createPoll = (poll: PollsModelType) => {
  return db.poll.upsert({ ...poll });
};

export const deletePoll = (id: string) => {
  return db.poll.destroy({ where: { id } });
};

export const truncatePolls = () => {
  return db.poll.destroy({ where: {} });
};
