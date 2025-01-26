import customGenerateId from "../../utils/customGenerateId";
import { ICategory } from "./category.interface";
import Category from "./category.model";

// category creatin service
const createCategoryIntoDB = async (payload: ICategory ) => {  
  const incrementId = await customGenerateId("category", Category);
  payload.id = incrementId;

  const newCategory = new Category(payload);
  const result = await newCategory.save();
  return result;
};

// get all categories
const getAllCategoriesFromDB = async () => {
    const result = await Category.find();
    return result;
};

// get all active categories
const getAllActiveCategoriesFromDB = async () => {
    const result = await Category.find({status: "active"});
    return result;
};

// get all featured categories
const getAllFeaturedCategoriesFromDB = async () => {
    const result = await Category.find({isFeatured: true});
    return result;
};

// get single category by id
const getCategoryByIdFromDB = async (_id: string ) => {
    const result = await Category.findById(_id);
    return result;
};


// update category 
const updateCategoryIntoDB = async ( _id: string ,payload: Partial<ICategory>) => {
  const result = await Category.findByIdAndUpdate(_id, payload, { new: true, runValidators: true });
  return result;
};

// delete category 
const deleteCategoryFromDB = async ( _id: string) => {
  const result = await Category.findByIdAndDelete(_id);
  return result;
};


export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getAllActiveCategoriesFromDB,
  getAllFeaturedCategoriesFromDB,
  getCategoryByIdFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB
};
