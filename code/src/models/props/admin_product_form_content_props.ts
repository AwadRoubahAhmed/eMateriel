import type { Category } from "../../../models/category";
import type { Product } from "../../../models/product";

type AdminProductFormContentProps = {
	categories: Category[];
	product?: Product;
};

export type { AdminProductFormContentProps };
