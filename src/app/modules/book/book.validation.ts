import { z } from "zod";

// Validation schema for creating a book
export const createBookValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    publisher: z.string().min(1, "Publisher is required"),
    publishedDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
      .optional(),
    language: z.string().min(1, "Language is required"),
    pageCount: z
      .number()
      .int()
      .positive("Page count must be a positive integer"),
    price: z.number().positive("Price must be a positive number"),
    stock: z.number().int().nonnegative("Stock cannot be negative"),
    description: z.string().optional(),
    coverImageUrl: z.string().url("Invalid cover image URL").optional(),
    categoryName: z.string().min(1, "Category name is required"),
    category: z.string().min(1, "Category ID is required"),
  }),
});

// Validation schema for updating a book
export const updateBookValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    author: z.string().min(1, "Author is required").optional(),
    publisher: z.string().min(1, "Publisher is required").optional(),
    publishedDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
      .optional(),
    language: z.string().min(1, "Language is required").optional(),
    pageCount: z
      .number()
      .int()
      .positive("Page count must be a positive integer")
      .optional(),
    price: z.number().positive("Price must be a positive number").optional(),
    stock: z.number().int().nonnegative("Stock cannot be negative").optional(),
    description: z.string().optional(),
    coverImageUrl: z.string().url("Invalid cover image URL").optional(),
    categoryName: z.string().min(1, "Category name is required").optional(),
    category: z.string().min(1, "Category ID is required").optional(),
  }),
});
