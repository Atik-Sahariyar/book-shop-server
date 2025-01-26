import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import customGenerateId from "../../utils/customGenerateId";
import { IBook } from "./book.interface";
import { Book } from "./book.model";
import httpStatus from "http-status";

// Create book service
const createBookIntoDB = async (payload: IBook) => {
  const incrementId = await customGenerateId("book", Book);
  payload.id = incrementId;

  const newBook = new Book(payload);
  const result = await newBook.save();
  return result;
};

// Get all books
const getAllBooksFromDB = async (query: Record<string, unknown>) => {
  const allUserQuery = new QueryBuilder(Book.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await allUserQuery.modelQuery;
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Users not found");
  }
  return result;
};

// Get all books by category
const getBooksByCategoryFromDB = async (categoryId: string) => {
  const result = await Book.find({ category: categoryId });
  return result;
};

// Get single book by ID
const getBookByIdFromDB = async (_id: string) => {
  const result = await Book.findById(_id);
  return result;
};

// Update book
const updateBookIntoDB = async (_id: string, payload: Partial<IBook>) => {
  const result = await Book.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// Delete book
const deleteBookFromDB = async (_id: string) => {
  const result = await Book.findByIdAndDelete(_id);
  return result;
};

// Get all books in stock
const getBooksInStockFromDB = async () => {
  const result = await Book.find({ stock: { $gt: 0 } });
  return result;
};

// Get featured books (if applicable, requires a `isFeatured` field in the book model)
const getFeaturedBooksFromDB = async () => {
  const result = await Book.find({ isFeatured: true });
  return result;
};

export const bookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getBooksByCategoryFromDB,
  getBookByIdFromDB,
  updateBookIntoDB,
  deleteBookFromDB,
  getBooksInStockFromDB,
  getFeaturedBooksFromDB,
};
