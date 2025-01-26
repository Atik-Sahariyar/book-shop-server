import express from "express";
import {
  createCategory,
  deleteCategoryById,
  getAllActiveCategories,
  getAllCategories,
  getAllFeaturedCategories,
  getCategoryById,
  getFiltreOptionsByCategoriesBrandsAndOthers,
  updateCategoryById,
} from "./category.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { createCategoryValidationSchema } from "./category.validation";

const router = express.Router();

// create a category
router.post("/create-category", validateRequest(createCategoryValidationSchema), createCategory);

// get all categories
router.get("/all-category", getAllCategories);

// get all active categories
router.get("/active-categories", getAllActiveCategories);

// get all featured categories
router.get("/featured-categories", getAllFeaturedCategories);

// get category by id
router.get("/category/:id", getCategoryById);

// update category by id
router.patch("/update/:id", updateCategoryById);

// delete category by id
router.delete("/delete/:id", deleteCategoryById);

// get filters options
router.get("/filters-options", getFiltreOptionsByCategoriesBrandsAndOthers);


export const categoryRoutes = router;
