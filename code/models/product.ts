type Product = {
	id: number;
	name: string;
	image: string;
	price: number;
	description: string;
	stock: number;
	category_id: number | null;
	category: { id: number; name: string } | null;
};

export type { Product };
