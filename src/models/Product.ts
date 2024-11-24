import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/IProduct";


// product schema model ( for book)
const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: 
    {   type: String, 
        enum: ["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"], 
        required: true 
    },
    description: { type: String },
    quantity: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
