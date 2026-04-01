import type { QueryResult, ResultSetHeader, RowDataPacket } from "mysql2";
import type { Role } from "../../models/role";
import type { User } from "../../models/user";
import MySQLService from "../service/mysql_service";
import RoleRepository from "./role_repository";

class SecurityRepository {
	private table = "user";

	// REGISTER
	public register = async (data: Partial<User>): Promise<User | Error> => {
		const connection = await new MySQLService().connect();

		const sql = `
			INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table}
			(email, password, role_id)
			VALUES (:email, :password, 2)
		`;

		try {
			const [result] = await connection.execute<ResultSetHeader>(sql, data);

			return {
				id: result.insertId,
				email: data.email,
				password: data.password,
				role_id: data.role_id,
			} as User;
		} catch (error) {
			return error as Error;
		}
	};

	// CHECK EMAIL EXISTS
	public isEmailUserExists = async (
		data: Partial<User>,
	): Promise<QueryResult[] | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
			SELECT id
			FROM ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE email = :email
			LIMIT 1
		`;

		try {
			const [rows] = await connection.execute<RowDataPacket[]>(sql, data);

			return rows.length > 0;
		} catch (error) {
			return error as Error;
		}
	};

	// GET USER BY EMAIL
	public selectOneByEmail = async (
		data: Partial<User>,
	): Promise<User | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
			SELECT *
			FROM ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE email = :email
			LIMIT 1
		`;

		try {
			const [rows] = await connection.execute<RowDataPacket[]>(sql, data);

			if (rows.length === 0) return null;

			const result = rows[0] as User;

			// relation role
			result.role = (await new RoleRepository().selectOne({
				id: result.role_id,
			})) as Role;

			return result;
		} catch (error) {
			return error as Error;
		}
	};
}

export default SecurityRepository;
