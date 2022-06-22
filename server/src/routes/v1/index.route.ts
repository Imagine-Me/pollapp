import { Router } from "express";
import userRoute from "./user.route";
import pollsRoute from "./polls.route";
import questionRoute from "./question.route";
import roomRoute, {
  unProtectedRoute as roomUnProtectedRoute,
} from "./room.route";

interface RoutesInterface {
  protectedRoutes: RouteInterface[];
  unProtectedRoutes: RouteInterface[];
}

interface RouteInterface {
  route: Router;
  path: string;
}

const protectedRoutes = Router();
const unProtectedRoutes = Router();

const defaultRoutes: RoutesInterface = {
  protectedRoutes: [
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
    {
      route: roomRoute,
      path: "/room",
    },
  ],
  unProtectedRoutes: [
    {
      route: roomUnProtectedRoute,
      path: "/room",
    },
  ],
};

defaultRoutes.protectedRoutes.forEach((route) => {
  protectedRoutes.use(route.path, route.route);
});

defaultRoutes.unProtectedRoutes.forEach((route) => {
  unProtectedRoutes.use(route.path, route.route);
});

export default protectedRoutes;

export { unProtectedRoutes };
