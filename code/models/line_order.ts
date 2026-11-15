type Line_order = {
	id: number;
	qty: number;
	unit_price: number;
	total: number;
	product_name: string;
	product_id: number | null;
	order_id: number;
};

export type { Line_order };
