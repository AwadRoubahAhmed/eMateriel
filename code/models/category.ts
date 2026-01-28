import type { Product } from "./product";

type Category = {
	id: number;
	name: string;
	description: string;
	
	product_ids: string;
	products: Product[];
}; 

export type { Category };
