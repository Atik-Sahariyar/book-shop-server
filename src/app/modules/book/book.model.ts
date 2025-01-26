import { Schema, model } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    publishedDate: { type: String, required: true }, // Ensure proper date format
    language: { type: String, default: "Bangla" },
    pageCount: { type: Number, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    coverImageUrl: { type: String, required: true },
    categoryName: { type: String, required: true }, // Category name for easy access
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true }, // Reference to Category model
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt timestamps
  }
);

// Create the model
export const Book = model<IBook>("Book", bookSchema);
