import { Document } from "mongoose";


export type Category = "Fiction" | "Science" | "SelfDevelopment" | "Poetry" | "Religious";


// product interface
export interface IProduct extends Document {
    title: string;
    author: string;
    price: number;
    category: Category;
    description: string;
    quantity: number;
    inStock: boolean;
    createdAt: Date;
    updatedAt: Date;
  }