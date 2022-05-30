import { Sequelize, DataTypes } from "sequelize";

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
    },
    pollId: {
      type: DataTypes.UUID,
      references: {
        model: "polls",
        key: "id",
      },
    },
  });
};

export default RoomModel;
