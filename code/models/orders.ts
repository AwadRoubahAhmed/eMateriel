import type { Payment_methode } from "./payment_methode";
import type { User } from "./user";

type Orders = {
	id: number;
	name: string;
	image: string;
	total: number;
	description: string;
	user_id: number;
	user: User;
	payment_methode_id: number;
	payment_method: Payment_methode;
};

export type { Orders };
