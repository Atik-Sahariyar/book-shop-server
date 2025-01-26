import { model, Schema } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    slug: { type: String, required: true, unique: true },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    totalProduct: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Category = model<ICategory>("Category", categorySchema);

export default Category;
