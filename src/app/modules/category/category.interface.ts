export interface ICategory {
  id: string; // Unique identifier for the category
  name: string; // Name of the category
  description?: string; // Optional description of the category
  image?: string; // Optional image URL representing the category
  slug: string; // URL-friendly name for the category
  isFeatured?: boolean; // Whether the category is featured or highlighted
  status: "active" | "inactive"; // Status of the category (e.g., for visibility control)
  totalProduct: number;
}
