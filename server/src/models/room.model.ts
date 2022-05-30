import { Sequelize, DataTypes } from "sequelize";

export interface RoomModelsType {
  userId: string;
  pollId: string;
}

const RoomModel = (sequelize: Sequelize) => {
  return sequelize.define("room", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
      validate: {
        notNull: { msg: "User auth required" },
      },
    },
    pollId: {
      type: DataTypes.UUID,
      references: {
        model: "polls",
        key: "id",
      },
      allowNull: false,
      validate: {
        notNull: { msg: "Poll required" },
      },
    },
  });
};

export default RoomModel;
