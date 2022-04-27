import path from "path";

export default {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    dialect: "postgres",
    dialectOptions: {
      setUTC: true,
    },
  },
  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    dialect: "postgres",
    dialectOptions: {
      setUTC: true,
    },
    logging: false,
  },
  test: {
    dialect: "sqlite",
    host: "localhost",
    username: "prince",
    password: "password",
    database: process.env.PG_DATABASE,
    storage: path.resolve(__dirname, "../..", "db.sqlite"),
    logging: false,
  },
} as any;
