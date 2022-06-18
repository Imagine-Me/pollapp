import { Sequelize, DataTypes } from "sequelize";

export interface PollsModelType {
  title: string;
  userId: string;
}

const PollModel = (sequelize: Sequelize) => {
  return sequelize.define("poll", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Title is required" },
      },
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
    },
    type: {
      type: DataTypes.ENUM,
      values: ["public", "private"],
      defaultValue: "private",
    },
  });
};

export default PollModel;
