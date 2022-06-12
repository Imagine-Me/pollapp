import { Model, ModelStatic, Options, Sequelize } from "sequelize";

import models from "../models/index.model";
import dbConfig from "../config/db.config";

export interface Databases {
  [key: string]: ModelStatic<Model<any, any>>;
}

const db = {} as Databases;

const env: string = process.env.NODE_ENV ?? "development";
const configurations: any = dbConfig;
const sequelize = new Sequelize(configurations[env] as Options);

const initializeDatabase = async () => {
  const modelKeys = Object.keys(models);
  for (let i = 0; i < modelKeys.length; i++) {
    const model = modelKeys[i];
    db[model] = models[model].model(sequelize);
    if (models[model].hasMany && Array.isArray(models[model].hasMany)) {
      models[model].hasMany.forEach((hasManyModel: string) => {
        db[hasManyModel].hasMany(db[model]);
      });
    }
    await db[model].sync();
  }
};

export { db, initializeDatabase, sequelize };
