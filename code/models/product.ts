import type { Category } from "./category";

type Product = {
	id: number;
	name: string;
	image: string;
	price: number;
	description: string;
	stock: number;
	category_id: number;
	category: Category;
};

export type { Product };
