import type { Role } from "../../models/role";
import type { User } from "../../models/user";
import MySQLService from "../service/mysql_service";
import Role_Repository from "./role_repository";

class User_Repository {
	//NOM DE LA TABLE SQL
	private table = "user";
	public selectAll = async (): Promise<User[] | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table};
        `;

		try {
			const [query] = await connection.execute(sql);

			// Boucler sur les resultats pour récupérer les clés étrangères;
			for (let i = 0; i < (query as User[]).length; i++) {
				const result = (query as User[])[i] as User;

				// Clés étrangères
				result.role = (await new Role_Repository().selectOne({
					id: result.role_id,
				})) as Role;
			}

			return query;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (data: Partial<User>): Promise<User[] | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE ${this.table}.id = :id
			; 
        `;

		try {
			const [query] = await connection.execute(sql, data);

			const result = (query as User[]).shift() as User;

			// Clés étrangères
			result.role = (await new Role_Repository().selectOne({
				id: result.role_id,
			})) as Role;

			//Retourner les resultats
			return result;
		} catch (error) {
			return error;
		}
	};
	// 	const connection = await new MySQLService().connect();

	// 	const sql = `
	//     INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table}
	//     (email, password, role_id)
	//     VALUES (:email, :password, :role_id);
	// `;

	// 	try {
	// 		const [result] = await connection.execute<ResultSetHeader>(sql, data);

	// 		return {
	// 			id: result.insertId,
	// 			...data,
	// 		} as User;
	// 	} catch (error) {
	// 		return error as Error;
	// 	}
	// };
}

export default User_Repository;
