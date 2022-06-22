import express from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import { initializeDatabase } from "./db/index.db";
import v1ProtectedRoutes, {
  unProtectedRoutes as v1UnProtectedRoutes,
} from "./routes/v1/index.route";
import authMiddleware from "./middlewares/auth.middelware";
import protectedRouteMiddleware from "./middlewares/protectedRoute.middleware";
import userMiddleWare from "./middlewares/user.middleware";
import errorMiddleware from "./middlewares/error.middleware";
import initializeSocket from "./socket";
import { connectRedis } from "./redis/index";

dotenv.config();
const app = express();

connectRedis();

const whiteList = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
  "http://localhost:3004",
  "http://localhost:9000",
  "http://localhost:8001",
  "http://localhost:8002",
  "http://localhost:8003",
  "http://localhost:8004",
  "https://pollapp-profile.netlify.app",
  "https://pollapp-shell.netlify.app",
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
app.use(authMiddleware, userMiddleWare);
app.use("/api/v1", v1UnProtectedRoutes);
app.use("/api/v1", protectedRouteMiddleware, v1ProtectedRoutes);

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

initializeDatabase();

app.use(errorMiddleware);
const httpServer = initializeSocket(app);
export default httpServer;
