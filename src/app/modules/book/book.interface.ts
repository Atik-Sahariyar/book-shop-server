import { Schema } from "mongoose";

export interface IBook {
  id: string; // Unique identifier for the book
  title: string; // Title of the book
  author: string; // Author's name
  publisher: string; // Publisher's name
  publishedDate: string; // Date of publication (e.g., "2023-01-15")
  language: string; // Language of the book (e.g., "English")
  pageCount: number; // Total number of pages
  price: number; // Price of the book
  stock: number; // Number of items in stock
  description: string; // Detailed description or synopsis of the book
  coverImageUrl: string;
  categoryName: string;
  category: Schema.Types.ObjectId;
}
