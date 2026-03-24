import type { ResultSetHeader } from "mysql2";
import type { Line_order } from "../../models/line_order";
import type { Orders } from "../../models/orders";
import type { Product } from "../../models/product";
import MySQLService from "../service/mysql_service";
import Orders_Repository from "./orders_repository";
import Product_Repository from "./product_repository";

class Line_order_Repository {
	private table = "line_order";
	public selectAll = async (): Promise<Line_order[] | unknown> => {
		//connexion au serveur MySQL
		const connection = await new MySQLService().connect();
		//requete SQL "SELECT reservation_status.* FROM profit_dev.reservation_status;"
		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table};
        `;
		// try / catch : tente et recupere moi resultat et ou l'erreur
		try {
			//execute la requette
			const [query] = await connection.execute(sql);

			// Boucler sur les resultats pour récupérer les clés étrangères;
			for (let i = 0; i < (query as Line_order[]).length; i++) {
				const result = (query as Line_order[])[i];

				// Clés étrangères order_id
				result.order = (await new Orders_Repository().selectOne({
					id: result.order_id,
				})) as Orders;

				// Clés étrangères product_id
				result.product = (await new Product_Repository().selectOne({
					id: result.product_id,
				})) as Product;
			}

			//Retourner les resultats
			return query;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (
		data: Partial<Line_order>,
	): Promise<Line_order[] | unknown> => {
		//connexion au serveur MySQL
		const connection = await new MySQLService().connect();

		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE ${this.table}.id = :id
			; 
        `;

		try {
			const [query] = await connection.execute(sql, data);

			const result = (query as Line_order[]).shift() as Line_order;

			if (!result) return null;

			// Clés étrangères
			result.order = (await new Orders_Repository().selectOne({
				id: result.order_id,
			})) as Orders;

			result.product = (await new Product_Repository().selectOne({
				id: result.product_id,
			})) as Product;

			return result;
		} catch (error) {
			return error;
		}
	};

	public create = async (
		data: Partial<Line_order>,
	): Promise<number | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
			INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table}
			(order_id, product_id, quantity, price)
			VALUES (:order_id, :product_id, :quantity, :price);
		`;

		try {
			const [result] = await connection.execute<ResultSetHeader>(sql, data);
			return result.insertId;
		} catch (error) {
			return error;
		}
	};

	public update = async (
		id: number,
		data: Partial<Line_order>,
	): Promise<boolean | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
			UPDATE ${process.env.MYSQL_DATABASE}.${this.table}
			SET
				order_id = :order_id,
				product_id = :product_id,
				quantity = :quantity,
				price = :price
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

	public delete = async (id: number): Promise<boolean | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
			DELETE FROM ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE id = :id;
		`;

		try {
			const [result] = await connection.execute<ResultSetHeader>(sql, { id });
			return result.affectedRows > 0;
		} catch (error) {
			return error;
		}
	};

	// selectinlist
	public selectInList = async (
		list: string,
	): Promise<Line_order[] | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE  ${this.table}.id IN (${list});
			;
        `;

		try {
			const [query] = await connection.execute(sql);

			return query;
		} catch (error) {
			return error;
		}
	};
}

export default Line_order_Repository;
