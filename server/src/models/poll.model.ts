import { Sequelize, DataTypes } from "sequelize";

const PollModel = (sequelize: Sequelize) => {
  return sequelize.define("poll", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.STRING,
    },
    options: {
      type: DataTypes.JSONB,
    },
  });
};

export default PollModel