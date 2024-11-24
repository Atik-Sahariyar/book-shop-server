import mongoose, { Schema } from "mongoose";
import { IOrder } from "../interfaces/IOrder";


// order schema model 
const orderSchema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true, min: 0 },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now}
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
