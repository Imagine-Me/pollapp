import express from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import { initializeDatabase } from "./db/index.db";
import v1Routes from "./routes/v1/index.route";

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
app.use("/api/v1", v1Routes);

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

initializeDatabase();

export default app;
