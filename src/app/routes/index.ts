import { Router } from "express";

const router = Router();

const demoRoute = (req, res) => {
  res.send("Hello scratch server!");
};

const moduleRoutes = [
  {
    path: "/",
    route: demoRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
