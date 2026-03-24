import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { Payment_methode } from "../../models/payment_methode";
import MySQLService from "../service/mysql_service";

class Payment_method_Repository {
	private table = "payment_method";

	// SELECT ALL
	public selectAll = async (): Promise<Payment_methode[] | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `SELECT * FROM ${process.env.MYSQL_DATABASE}.${this.table};`;

		try {
			const [rows] = await connection.execute<RowDataPacket[]>(sql);
			return rows as Payment_methode[];
		} catch (error) {
			return error;
		}
	};

	// SELECT ONE
	public selectOne = async (
		data: Partial<Payment_methode>,
	): Promise<Payment_methode | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `SELECT * FROM ${process.env.MYSQL_DATABASE}.${this.table} WHERE id = :id;`;

		try {
			const [rows] = await connection.execute<RowDataPacket[]>(sql, data);
			return (rows as Payment_methode[]).shift() || null;
		} catch (error) {
			return error;
		}
	};

	// CREATE
	public create = async (
		data: Partial<Payment_methode>,
	): Promise<number | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table} (name) VALUES (:name);`;

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
		data: Partial<Payment_methode>,
	): Promise<boolean | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `UPDATE ${process.env.MYSQL_DATABASE}.${this.table} SET name = :name WHERE id = :id;`;

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
}

export default Payment_method_Repository;
