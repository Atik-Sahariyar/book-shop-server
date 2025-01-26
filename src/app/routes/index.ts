import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/Auth/auth.route";
import { categoryRoutes } from "../modules/category/category.route";
import { bookRoutes } from "../modules/book/book.routes";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: authRoutes },
  { path: "/users", route: userRoutes },
  { path: "/categories", route: categoryRoutes },
  { path: "/books", route: bookRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
