import express from "express";
import {
  createCategory,
  deleteCategoryById,
  getAllActiveCategories,
  getAllCategories,
  getAllFeaturedCategories,
  getCategoryById,
  updateCategoryById,
} from "./category.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { createCategoryValidationSchema } from "./category.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

// create a category
router.post(
  "/create-category",
  auth(USER_ROLE.admin),
  validateRequest(createCategoryValidationSchema),
  createCategory
);

// get all categories
router.get("/all-category", getAllCategories);

// get all active categories
router.get("/active-categories", getAllActiveCategories);

// get all featured categories
router.get("/featured-categories", getAllFeaturedCategories);

// get category by id
router.get("/category/:id", getCategoryById);

// update category by id
router.patch("/update/:id", auth(USER_ROLE.admin), updateCategoryById);

// delete category by id
router.delete("/delete/:id", auth(USER_ROLE.admin), deleteCategoryById);

export const categoryRoutes = router;
