import type { Orders } from "./orders";
import type { Product } from "./product";

type Line_order = {
	id: number;
	qty: number;
	total: number;
	order_id: number;
	order: Orders;
	product_id: number;
	product: Product;
};

export type { Line_order };
