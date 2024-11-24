import mongoose, { Document } from "mongoose";


// order interface for type validation
export interface IOrder extends Document {
    email: string;
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
  }