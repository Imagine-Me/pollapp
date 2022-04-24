import { Router } from "express";
import userRoute from "./user.route";

const router = Router();

const defaultRoutes = [
  {
    route: userRoute,
    path: "/user",
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
