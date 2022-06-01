/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");

module.exports = {
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
  dev: {
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
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE_TEST,
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
};
