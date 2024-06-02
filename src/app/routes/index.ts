import { Router } from "express";
import { demoRoute } from "../modules/scratch/scratch.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/",
    route: demoRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
