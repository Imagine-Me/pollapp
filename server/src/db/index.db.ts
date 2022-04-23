import { Model,ModelStatic, Options, Sequelize } from "sequelize";

import models from "../models/index.model";
import dbConfig from "../config/db.config";

export interface Databases {
  [key: string]: ModelStatic<Model<any, any>>;
}

const db = {} as Databases;

const env = process.env.NODE_ENV ?? "development";
const sequelize = new Sequelize(dbConfig[env] as Options);

Object.keys(models).forEach((model) => {
  db[model] = models[model](sequelize);
});

export { db };
