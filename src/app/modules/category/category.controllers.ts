import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { categoryServices } from "./category.services";
import httpStatus from "http-status";

// create category
export const createCategory = catchAsync(async (req, res) => {
  const categoryData = req.body;
  const result = await categoryServices.createCategoryIntoDB(categoryData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${categoryData.name} category created successfully!`,
    data: result,
  });
});

// get all category
export const getAllCategories = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategoriesFromDB();

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `All categories retirved successfully!`,
    data: result,
  });
});

// get all active category
export const getAllActiveCategories = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllActiveCategoriesFromDB();

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `All active categories retirved successfully!`,
    data: result,
  });
});

// get all featured category
export const getAllFeaturedCategories = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllFeaturedCategoriesFromDB();

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `All featured categories retirved successfully!`,
    data: result,
  });
});

// get category by id
export const getCategoryById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await categoryServices.getCategoryByIdFromDB(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result?.name} category retirved successfully!`,
    data: result,
  });
});

// update category by id
export const updateCategoryById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await categoryServices.updateCategoryIntoDB(id, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result?.name} category updated successfully!`,
    data: result,
  });
});

// delete category by id
export const deleteCategoryById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await categoryServices.deleteCategoryFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result?.name} category deleted successfully!`,
    data: result,
  });
});
