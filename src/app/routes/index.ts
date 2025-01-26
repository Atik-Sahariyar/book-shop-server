import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/Auth/auth.route";
import { categoryRoutes } from "../modules/category/category.route";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: authRoutes },
  { path: "/users", route: userRoutes },
  { path: "/categories", route: categoryRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
