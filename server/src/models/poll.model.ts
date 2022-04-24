import { Sequelize, DataTypes } from "sequelize";

export interface PollsModelType {
  question: string;
  options: string[];
}

const PollModel = (sequelize: Sequelize) => {
  return sequelize.define("poll", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Title is required" },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  });
};

export default PollModel;
