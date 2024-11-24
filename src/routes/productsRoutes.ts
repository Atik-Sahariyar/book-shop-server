import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productsControllers";

const productsRoute = express.Router();

// Route to create a new product
productsRoute.post("/", createProduct);

// Route to retrieve all products or filter by search term
productsRoute.get("/", getAllProducts);

// Route to retrieve a product by its ID
productsRoute.get("/:productId", getProductById);

// Route to update a product by its ID
productsRoute.put("/:productId", updateProduct);

// Route to delete a product by its ID
productsRoute.delete("/:productId", deleteProduct);

export default productsRoute;
