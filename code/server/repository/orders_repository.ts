import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { Line_order } from "../../models/line_order";
import type { Orders } from "../../models/orders";
import type { Payment_methode } from "../../models/payment_methode";
import type { User } from "../../models/user";

import MySQLService from "../service/mysql_service";
import Line_order_Repository from "./line_order_repository";
import Payment_method_Repository from "./payment_method_repository";
import User_Repository from "./user_repository";

class Orders_Repository {
	private table = "orders";

	// SELECT ALL
	public selectAll = async (): Promise<Orders[] | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `
			SELECT ${this.table}.*,
			GROUP_CONCAT(line_order.id) AS line_order_ids
			FROM ${process.env.MYSQL_DATABASE}.${this.table}
			LEFT JOIN ${process.env.MYSQL_DATABASE}.line_order
			ON ${this.table}.id = line_order.order_id
			GROUP BY ${this.table}.id;
		`;

		try {
			const [rows] = await connection.execute<RowDataPacket[]>(sql);
			const results = rows as Orders[];

			for (const order of results) {
				order.user = (await new User_Repository().selectOne({
					id: order.user_id ?? undefined,
				})) as User;

				order.payment_method = (await new Payment_method_Repository().selectOne(
					{
						id: order.payment_methode_id ?? undefined,
					},
				)) as Payment_methode;

				order.line_orders = (await new Line_order_Repository().selectInList(
					order.line_order_ids,
				)) as Line_order[];
			}

			return results;
		} catch (error) {
			return error;
		}
	};

	// SELECT ONE
	public selectOne = async (
		data: Partial<Orders>,
	): Promise<Orders | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `
			SELECT ${this.table}.* 
			FROM ${process.env.MYSQL_DATABASE}.${this.table} 
			WHERE id = :id;
		`;

		try {
			const [rows] = await connection.execute<RowDataPacket[]>(sql, data);
			const order = (rows as Orders[]).shift();

			if (!order) return null;

			order.user = (await new User_Repository().selectOne({
				id: order.user_id ?? undefined,
			})) as User;
			order.payment_method = (await new Payment_method_Repository().selectOne({
				id: order.payment_methode_id ?? undefined,
			})) as Payment_methode;

			return order;
		} catch (error) {
			return error;
		}
	};

	// CREATE
	public create = async (data: Partial<Orders>): Promise<number | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `
			INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table}
			(user_id, payment_methode_id, total)
			VALUES (:user_id, :payment_methode_id, :total);
		`;

		try {
			const [result] = await connection.execute<ResultSetHeader>(sql, data);
			return result.insertId;
		} catch (error) {
			return error;
		}
	};

	// UPDATE
	public update = async (
		id: number,
		data: Partial<Orders>,
	): Promise<boolean | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `
			UPDATE ${process.env.MYSQL_DATABASE}.${this.table}
			SET user_id = :user_id, payment_methode_id = :payment_methode_id, total = :total
			WHERE id = :id;
		`;

		try {
			const [result] = await connection.execute<ResultSetHeader>(sql, {
				...data,
				id,
			});
			return result.affectedRows > 0;
		} catch (error) {
			return error;
		}
	};

	// DELETE
	public delete = async (id: number): Promise<boolean | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `DELETE FROM ${process.env.MYSQL_DATABASE}.${this.table} WHERE id = :id;`;

		try {
			const [result] = await connection.execute<ResultSetHeader>(sql, { id });
			return result.affectedRows > 0;
		} catch (error) {
			return error;
		}
	};

	// SELECT IN LIST
	public selectInList = async (list: string): Promise<Orders[] | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `
			SELECT ${this.table}.* 
			FROM ${process.env.MYSQL_DATABASE}.${this.table} 
			WHERE id IN (${list});
		`;

		try {
			const [rows] = await connection.execute<RowDataPacket[]>(sql);
			return rows as Orders[];
		} catch (error) {
			return error;
		}
	};

	public selectUserCart = async (user_id: number) => {
		const connection = await new MySQLService().connect();

		const sql = `
		SELECT *
		FROM ${process.env.MYSQL_DATABASE}.${this.table}
		WHERE user_id = :user_id
		ORDER BY id DESC
		LIMIT 1;
	`;

		const [rows] = await connection.execute(sql, { user_id });

		return (rows as Orders[]).shift() ?? null;
	};
}

export default Orders_Repository;
