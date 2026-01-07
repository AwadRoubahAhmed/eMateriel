import type { Category } from "./category";
import type { Notice } from "./notice";

type Product = {
	id: number;
	name: string;
	image: string;
	price: number;
	description: string;
	stock: number;
	category_id: number;
	category: Category;

	notice_ids: string;
	notices: Notice[];
};

export type { Product };
