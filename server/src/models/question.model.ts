import { Sequelize, DataTypes } from "sequelize";

const QuestionModel = (sequelize: Sequelize) => {
  return sequelize.define("question", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Question is required" },
      },
    },
    options: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        optionValue: (options: string[]) => {
          if (options.length < 2) {
            throw new Error("At least 2 options should be added");
          }
        },
      },
    },
    pollId: {
      type: DataTypes.INTEGER,
      references: {
        model: "polls",
        key: "id",
      },
    },
  });
};

export default QuestionModel;
