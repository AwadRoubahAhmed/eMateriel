import type { Line_order } from "./line_order";
import type { Payment_methode } from "./payment_methode";
import type { User } from "./user";

type Orders = {
	id: number;
	name: string;
	image: string;
	total: number;
	description: string;
	user_id: number | null;
	user: User;
	payment_methode_id: number;
	payment_method: Payment_methode;

	line_order_ids: string;
	line_orders: Line_order[];
};

export type { Orders };
