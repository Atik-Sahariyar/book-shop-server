import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import Brand from "../brand/brand.model";
import Product from "../product/product.model";
import Category from "./category.model";
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

// get filter options by category , brands & others
export const getFiltreOptionsByCategoriesBrandsAndOthers = catchAsync(
  async (req, res) => {
    const categoryData = await Category.find()
      .sort({ totalProduct: -1 })
      .select("name totalProduct");
    const categoris = categoryData?.map((cat) => ({
      label: cat?.name,
      count: cat?.totalProduct,
    }));
    const brandData = await Brand.find()
      .sort({ totalProduct: -1 })
      .select("name totalProduct");
    const brands = brandData?.map((brand) => ({
      label: brand?.name,
      count: brand?.totalProduct,
    }));

    // Fetch colors and sizes fields from the Product collection
    const products = await Product.find({}, { colors: 1, sizes: 1 });

    // Combine all color arrays and size arrays into one for each
    const allColors = products.flatMap((product) => product.colors);
    const allSizes = products.flatMap((product) => product.sizes);

    // Remove duplicates (case-insensitive) and format the arrays
    const uniqueColorsMap = new Map();
    const uniqueSizesMap = new Map();

    allColors.forEach((color) => {
      const lowercaseColor = color.toLowerCase();
      if (!uniqueColorsMap.has(lowercaseColor)) {
        uniqueColorsMap.set(lowercaseColor, color);
      }
    });

    allSizes.forEach((size) => {
      const lowercaseSize = size.toLowerCase();
      if (!uniqueSizesMap.has(lowercaseSize)) {
        uniqueSizesMap.set(lowercaseSize, size);
      }
    });

    // Map values to the desired format
    const uniqueColors = Array.from(uniqueColorsMap.values()).map((color) => ({
      label: color,
    }));
    const uniqueSizes = Array.from(uniqueSizesMap.values()).map((size) => ({
      label: size,
    }));
    
    const filters = [
      {
        name: "PRODUCT CATEGORY",
        key: "category",
        items: categoris,
      },
      {
        name: "PRICE",
        key: "price",
        items: [
          { label: "0-20", range: [0, 20] },
          { label: "21-50", range: [21, 50] },
          { label: "51-100", range: [51, 100] },
        ],
      },
      {
        name: "SIZE",
        key: "size",
        items: uniqueSizes,
      },
      {
        name: "COLOR",
        key: "colors",
        items: uniqueColors,
      },
      {
        name: "BRAND NAME",
        key: "brand",
        items: brands,
      },
    ];

    sendResponse(res, {
      success: true,
      message: " Retrived filter options",
      statusCode: httpStatus.OK,
      data: filters,
    });
  }
);
