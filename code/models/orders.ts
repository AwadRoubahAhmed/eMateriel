import type { Line_order } from "./line_order";

type OrderStatus = "en_attente" | "payee" | "expediee" | "livree" | "annulee";

type Orders = {
	id: number;
	user_id: number;
	user_email?: string;
	status: OrderStatus;
	total: number;
	shipping_name: string;
	shipping_address: string;
	shipping_zip: string;
	shipping_city: string;
	shipping_phone: string;
	stripe_session_id?: string | null;
	created_at: string;
	line_orders?: Line_order[];
};

export type { Orders, OrderStatus };

// Changements de statut autorisés (partagé API + back-office). Annulée et livrée sont
// définitifs : le stock d'une annulation a déjà été rendu.
const ORDER_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
	en_attente: ["payee", "annulee"],
	payee: ["expediee", "annulee"],
	expediee: ["livree"],
	livree: [],
	annulee: [],
};

export { ORDER_TRANSITIONS };
