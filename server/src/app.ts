import express from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import { db } from "./db/index.db";

dotenv.config();

const app = express();

const whiteList = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
  "http://localhost:3004",
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (origin) {
      if (whiteList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("CORS ERROR"));
      }
    } else {
      callback(null);
    }
  },
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

Object.keys(db).forEach((model) => {
  db[model].sync();
});

export default app;
