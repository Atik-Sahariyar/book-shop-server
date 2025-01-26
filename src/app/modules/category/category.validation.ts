import { z } from "zod";
import Category from "./category.model";

// Define the Zod validation schema
export const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    image: z.string().url("Invalid image URL").optional(),
    slug: z.string().min(1, "Slug is required"),
  }),
});

// Custom function for uniqueness validation
async function validateUniqueField(
  field: "id" | "name" | "slug",
  value: string
): Promise<boolean> {
  const existingCategory = await Category.findOne({ [field]: value });
  return !existingCategory;
}

// Wrapper for validation with uniqueness checks
export async function validateCategory(data: unknown) {
  // Validate base schema first
  const baseValidation = createCategoryValidationSchema.safeParse(data);
  if (!baseValidation.success) {
    throw new Error(
      `Validation failed: ${JSON.stringify(baseValidation.error.errors)}`
    );
  }

  const categoryData = baseValidation.data.body;

  const isNameUnique = await validateUniqueField("name", categoryData.name);
  if (!isNameUnique) {
    throw new Error(`Name '${categoryData.name}' is already in use`);
  }

  const isSlugUnique = await validateUniqueField("slug", categoryData.slug);
  if (!isSlugUnique) {
    throw new Error(`Slug '${categoryData.slug}' is already in use`);
  }

  return categoryData; // Return validated and unique category data
}

// Define the Zod validation schema for updating a category
export const updateCategoryValidationSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
  image: z.string().url("Invalid image URL").optional(),
  slug: z.string().min(1, "Slug is required").optional(),
  isFeatured: z.boolean().optional(),
  status: z.enum(["active", "inactive"]).optional(),
});
