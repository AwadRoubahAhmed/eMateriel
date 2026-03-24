import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { Notice } from "../../models/notice";
import type { Product } from "../../models/product";
import MySQLService from "../service/mysql_service";
import Product_Repository from "./product_repository";

class Notice_Repository {
	private table = "notice";

	public selectAll = async (): Promise<Notice[] | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table};
        `;

		try {
			const [query] = await connection.execute<RowDataPacket[]>(sql);

			for (let i = 0; i < (query as Notice[]).length; i++) {
				const result = (query as Notice[])[i];

				// Clés étrangères
				result.product = (await new Product_Repository().selectOne({
					id: result.product_id,
				})) as Product;
			}
			return query;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (
		data: Partial<Notice>,
	): Promise<Notice[] | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE ${this.table}.id = :id
			; 
        `;

		try {
			const [query] = await connection.execute(sql, data);

			const result = (query as Notice[]).shift() as Notice;

			if (!result) return null;

			// Clés étrangères
			result.product = (await new Product_Repository().selectOne({
				id: result.product_id,
			})) as Product;
			return result;
		} catch (error) {
			return error;
		}
	};

	public create = async (data: Partial<Notice>): Promise<number | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `
			INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table}
			(product_id, title, description)
			VALUES (:product_id, :title, :description);
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
		data: Partial<Notice>,
	): Promise<boolean | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `
			UPDATE ${process.env.MYSQL_DATABASE}.${this.table}
			SET product_id = :product_id, title = :title, description = :description
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
		const sql = `DELETE FROM ${process.env.MYSQL_DATABASE}.${this.table} WHERE id = :id;`;

		try {
			const [result] = await connection.execute<ResultSetHeader>(sql, { id });
			return result.affectedRows > 0;
		} catch (error) {
			return error;
		}
	};

	public selectInList = async (list: string): Promise<Notice[] | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE  ${this.table}.id IN (${list});
			;
        `;

		try {
			const [rows] = await connection.execute<RowDataPacket[]>(sql, list);
			return rows as Notice[];
		} catch (error) {
			return error;
		}
	};
}

export default Notice_Repository;
