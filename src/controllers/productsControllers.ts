import { Request, Response } from "express";
import Product from "../models/Product";
import { sendErrorResponse } from "../utils/sendErrorResponse";

// Utility function for validating MongoDB IDs
const isValidMongoId = (id: string): boolean => /^[0-9a-fA-F]{24}$/.test(id);

// Controller function for creating a new product (book)
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = new Product(req.body);

    // Save the product to the database
    const savedProduct = await product.save();

    res.status(201).json({
      message: "Book created successfully",
      success: true,
      data: savedProduct,
    });
  } catch (error: any) {
    console.error(error);
    sendErrorResponse(res, 400, "Failed to create book", error.message || "Unknown error");
  }
};

// Controller function for getting all products (books)
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined;

    const query = searchTerm
      ? {
          $or: [
            { title: { $regex: searchTerm, $options: "i" } },
            { author: { $regex: searchTerm, $options: "i" } },
            { category: { $regex: searchTerm, $options: "i" } },
          ],
        }
      : {};

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .select("-__v");

    res.status(200).json({
      message: "Books retrieved successfully",
      success: true,
      data: products,
    });
  } catch (error: any) {
    console.error(error);
    sendErrorResponse(res, 500, "Failed to retrieve books", error.message || "Unknown error");
  }
};

// Controller function for getting a product by its ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;

    if (!isValidMongoId(productId)) {
       sendErrorResponse(res, 400, "Invalid product ID format", "");
    }

    const product = await Product.findById(productId).select("-__v");

    if (!product) {
       res.status(404).json({ message: "Book not found", success: false });
    }

    res.status(200).json({
      message: "Book retrieved successfully",
      success: true,
      data: product,
    });
  } catch (error: any) {
    console.error(error);
    sendErrorResponse(res, 500, "Failed to retrieve book", error.message || "Unknown error");
  }
};

// Controller function for updating a product by its ID
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;

    if (!isValidMongoId(productId)) {
       sendErrorResponse(res, 400, "Invalid product ID format", " ");
    }

    const updateData = { ...req.body, updatedAt: new Date() };

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

    if (!updatedProduct) {
       res.status(404).json({ message: "Book not found", success: false });
    }

    res.status(200).json({
      message: "Book updated successfully",
      success: true,
      data: updatedProduct,
    });
  } catch (error: any) {
    console.error(error);
    sendErrorResponse(res, 400, "Failed to update book", error.message || "Unknown error");
  }
};

// Controller function for deleting a product by its ID
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;

    if (!isValidMongoId(productId)) {
       sendErrorResponse(res, 400, "Invalid product ID format", "");
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
       res.status(404).json({ message: "Book not found", success: false });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      success: true,
    });
  } catch (error: any) {
    console.error(error);
    sendErrorResponse(res, 500, "Failed to delete book", error.message || "Unknown error");
  }
};
