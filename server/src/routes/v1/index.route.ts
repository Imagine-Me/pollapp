import { Router } from "express";
import userRoute from "./user.route";
import pollsRoute from "./polls.route";
import questionRoute from "./question.route";

interface RouteInterface {
  route: Router;
  path: string;
}

const router = Router();

const defaultRoutes: RouteInterface[] = [
  {
    route: userRoute,
    path: "/user",
  },
  {
    route: pollsRoute,
    path: "/polls",
  },
  {
    route: questionRoute,
    path: "/question",
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
