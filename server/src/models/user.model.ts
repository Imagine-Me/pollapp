import { Sequelize, DataTypes } from "sequelize";

export interface UserModelType {
  name: string;
  email: string;
}

const UserModel = (sequelize: Sequelize) => {
  return sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name cannot be empty" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: { msg: "Email cannot be empty" },
      },
    },
  });
};

export default UserModel;
