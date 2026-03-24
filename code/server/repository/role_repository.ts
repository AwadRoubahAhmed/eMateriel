import type { Role } from "../../models/role";
import MySQLService from "../service/mysql_service";

class Role_Repository {
	private table = "role";
	public selectAll = async (): Promise<Role[] | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table};
        `;

		try {
			const [query] = await connection.execute(sql);
			return query;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (data: Partial<Role>): Promise<Role[] | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE ${this.table}.id = :id
			; 
        `;

		try {
			const [query] = await connection.execute(sql, data);
			const resultat = (query as Role[]).shift();
			return resultat;
		} catch (error) {
			return error;
		}
	};
}

export default Role_Repository;
