import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import type { Line_order } from "../../models/line_order";
import { ORDER_TRANSITIONS, type Orders, type OrderStatus } from "../../models/orders";
import MySQLService from "../service/mysql_service";

export type OrderItem = { product_id: number; qty: number };
export type Shipping = {
	name: string;
	address: string;
	zip: string;
	city: string;
	phone: string;
};

// erreur métier → réponse 409 (stock insuffisant, produit supprimé…)
export class OrderError extends Error {}

const round2 = (n: number) => Math.round(n * 100) / 100;

export const TRANSITIONS = ORDER_TRANSITIONS;

// au-delà, un client doit payer ou annuler avant de recommander (pas de stock bloqué en masse)
export const MAX_PENDING_PER_USER = 2;

const restoreStock = async (connection: PoolConnection, orderId: number) => {
	await connection.execute(
		`UPDATE product JOIN line_order ON line_order.product_id = product.id
		 SET product.stock = product.stock + line_order.qty
		 WHERE line_order.order_id = :orderId`,
		{ orderId },
	);
};

class Orders_Repository {
	// Crée la commande : prix relus en base (jamais ceux du navigateur),
	// stock vérifié et réservé dans la même transaction.
	public create = async (
		userId: number,
		items: OrderItem[],
		shipping: Shipping,
	) => {
		// fusionner les doublons (même produit deux fois)
		const qtyById = new Map<number, number>();
		for (const { product_id, qty } of items) {
			qtyById.set(product_id, (qtyById.get(product_id) ?? 0) + qty);
		}
		const ids = [...qtyById.keys()];

		return new MySQLService().transaction(async (connection) => {
			const placeholders = ids.map((_, i) => `:p${i}`).join(",");
			const params = Object.fromEntries(ids.map((id, i) => [`p${i}`, id]));
			// FOR UPDATE : bloque ces lignes jusqu'à la fin de la transaction (pas de survente)
			const [rows] = await connection.execute<RowDataPacket[]>(
				`SELECT id, name, price, stock FROM product WHERE id IN (${placeholders}) FOR UPDATE`,
				params,
			);

			const lines = ids.map((id) => {
				const product = rows.find((r) => r.id === id);
				const qty = qtyById.get(id) as number;
				if (!product) throw new OrderError(`Produit ${id} introuvable`);
				if (product.stock < qty) {
					throw new OrderError(
						`Stock insuffisant pour « ${product.name} » (${product.stock} disponible(s))`,
					);
				}
				return {
					product_id: id,
					product_name: product.name as string,
					unit_price: Number(product.price),
					qty,
					total: round2(Number(product.price) * qty),
				};
			});
			const total = round2(lines.reduce((sum, l) => sum + l.total, 0));

			const [order] = await connection.execute<ResultSetHeader>(
				`INSERT INTO orders (user_id, total, shipping_name, shipping_address, shipping_zip,
				 shipping_city, shipping_phone, payment_method_id)
				 VALUES (:userId, :total, :name, :address, :zip, :city, :phone, 1)`,
				{ userId, total, ...shipping },
			);

			for (const line of lines) {
				await connection.execute(
					`INSERT INTO line_order (qty, unit_price, total, product_name, product_id, order_id)
					 VALUES (:qty, :unit_price, :total, :product_name, :product_id, :orderId)`,
					{ ...line, orderId: order.insertId },
				);
				await connection.execute(
					"UPDATE product SET stock = stock - :qty WHERE id = :product_id",
					line,
				);
			}

			return { id: order.insertId, total, lines };
		});
	};

	public selectAll = async (): Promise<Orders[]> => {
		const db = await new MySQLService().connect();
		const [rows] = await db.execute<RowDataPacket[]>(
			`SELECT orders.*, user.email AS user_email FROM orders
			 JOIN user ON user.id = orders.user_id ORDER BY orders.id DESC`,
		);
		return rows as Orders[];
	};

	public selectByUser = async (userId: number): Promise<Orders[]> => {
		const db = await new MySQLService().connect();
		const [rows] = await db.execute<RowDataPacket[]>(
			"SELECT * FROM orders WHERE user_id = :userId ORDER BY id DESC",
			{ userId },
		);
		const orders = rows as Orders[];
		for (const order of orders) order.line_orders = await this.selectLines(order.id);
		return orders;
	};

	public selectOne = async (id: number): Promise<Orders | null> => {
		const db = await new MySQLService().connect();
		const [rows] = await db.execute<RowDataPacket[]>(
			`SELECT orders.*, user.email AS user_email FROM orders
			 JOIN user ON user.id = orders.user_id WHERE orders.id = :id`,
			{ id },
		);
		const order = rows[0] as Orders | undefined;
		if (!order) return null;
		order.line_orders = await this.selectLines(id);
		return order;
	};

	public selectLines = async (orderId: number): Promise<Line_order[]> => {
		const db = await new MySQLService().connect();
		const [rows] = await db.execute<RowDataPacket[]>(
			"SELECT * FROM line_order WHERE order_id = :orderId ORDER BY id",
			{ orderId },
		);
		return rows as Line_order[];
	};

	public countPending = async (userId: number) => {
		const db = await new MySQLService().connect();
		const [rows] = await db.execute<RowDataPacket[]>(
			"SELECT COUNT(*) AS n FROM orders WHERE user_id = :userId AND status = 'en_attente'",
			{ userId },
		);
		return Number(rows[0].n);
	};

	// commandes en attente plus anciennes que la durée de vie d'une page de paiement Stripe
	public selectStalePending = async (olderThanMinutes: number) => {
		const db = await new MySQLService().connect();
		const [rows] = await db.execute<RowDataPacket[]>(
			`SELECT id, stripe_session_id FROM orders
			 WHERE status = 'en_attente' AND created_at < NOW() - INTERVAL :minutes MINUTE`,
			{ minutes: olderThanMinutes },
		);
		return rows as { id: number; stripe_session_id: string | null }[];
	};

	public setStripeSession = async (id: number, sessionId: string) => {
		const db = await new MySQLService().connect();
		await db.execute(
			"UPDATE orders SET stripe_session_id = :sessionId WHERE id = :id",
			{ id, sessionId },
		);
	};

	// Changement de statut ; une annulation remet les produits en stock.
	public setStatus = async (id: number, status: OrderStatus) =>
		new MySQLService().transaction(async (connection) => {
			const [rows] = await connection.execute<RowDataPacket[]>(
				"SELECT status FROM orders WHERE id = :id FOR UPDATE",
				{ id },
			);
			if (!rows[0]) return false;
			const current = rows[0].status as OrderStatus;
			if (current === status) return true;
			if (!TRANSITIONS[current].includes(status)) {
				throw new OrderError(
					`Passage impossible de « ${current} » à « ${status} »`,
				);
			}
			if (status === "annulee") await restoreStock(connection, id);
			await connection.execute("UPDATE orders SET status = :status WHERE id = :id", {
				id,
				status,
			});
			return true;
		});
}

export default Orders_Repository;
