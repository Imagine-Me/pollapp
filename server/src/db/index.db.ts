import { Model, ModelStatic, Options, Sequelize } from "sequelize";

import models from "../models/index.model";
import dbConfig from "../config/db.config";

export interface Databases {
  [key: string]: ModelStatic<Model<any, any>>;
}

const db = {} as Databases;

const env = process.env.NODE_ENV ?? "development";
const sequelize = new Sequelize(dbConfig[env] as Options);

const initializeDatabase = async () => {
  const modelKeys = Object.keys(models);
  for (let i = 0; i < modelKeys.length; i++) {
    const model = modelKeys[i];
    db[model] = models[model].model(sequelize);
    if (models[model].hasMany) {
      db[models[model].hasMany].hasMany(db[model]);
    }
    await db[model].sync({ force: true });
  }
};

export { db, initializeDatabase };
