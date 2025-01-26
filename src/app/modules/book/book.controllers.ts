import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookServices } from "./book.services";
import httpStatus from "http-status";

// Create book
export const createBook = catchAsync(async (req, res) => {
  const bookData = req.body;
  const result = await bookServices.createBookIntoDB(bookData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Book "${bookData.title}" created successfully!`,
    data: result,
  });
});

// Get all books
export const getAllBooks = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await bookServices.getAllBooksFromDB(query);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Books not found");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All books retrieved successfully!",
    data: result,
  });
});

// Get books by category
export const getBooksByCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const result = await bookServices.getBooksByCategoryFromDB(categoryId);

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No books found for this category"
    );
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Books in category ${categoryId} retrieved successfully!`,
    data: result,
  });
});

// Get single book by ID
export const getBookById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookServices.getBookByIdFromDB(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Book not found");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Book with ID ${id} retrieved successfully!`,
    data: result,
  });
});

// Update book
export const updateBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await bookServices.updateBookIntoDB(id, payload);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Book not found for update");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Book with ID ${id} updated successfully!`,
    data: result,
  });
});

// Delete book
export const deleteBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookServices.deleteBookFromDB(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Book not found for deletion");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Book with ID ${id} deleted successfully!`,
    data: result,
  });
});

// Get books in stock
export const getBooksInStock = catchAsync(async (req, res) => {
  const result = await bookServices.getBooksInStockFromDB();

  if (!result || result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "No books in stock");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books in stock retrieved successfully!",
    data: result,
  });
});

// Get featured books
export const getFeaturedBooks = catchAsync(async (req, res) => {
  const result = await bookServices.getFeaturedBooksFromDB();

  if (!result || result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "No featured books found");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Featured books retrieved successfully!",
    data: result,
  });
});
