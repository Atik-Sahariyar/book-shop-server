import express from "express";
import {
  createBook,
  getAllBooks,
  getBooksByCategory,
  getBookById,
  updateBook,
  deleteBook,
  getBooksInStock,
  getFeaturedBooks,
} from "./book.controllers";
import validateRequest from "../../middlewares/validateRequest";
import {
  createBookValidationSchema,
  updateBookValidationSchema,
} from "./book.validation";

const router = express.Router();

// Create a book
router.post(
  "/create-book",
  validateRequest(createBookValidationSchema),
  createBook
);

// Get all books
router.get("/all-books", getAllBooks);

// Get books by category
router.get("/category/:categoryId", getBooksByCategory);

// Get a single book by ID
router.get("/:id", getBookById);

// Update a book
router.patch(
  "/update-book/:id",
  validateRequest(updateBookValidationSchema),
  updateBook
);

// Delete a book
router.delete("/delete-book/:id", deleteBook);

// Get all books in stock
router.get("/in-stock", getBooksInStock);

// Get featured books
router.get("/featured", getFeaturedBooks);

export const bookRoutes = router;
