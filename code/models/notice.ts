import type { Product } from "./product";

type Notice = {
	id: number;
	name: string;
	
	product_id: number;
	product: Product;
};

export type { Notice };
