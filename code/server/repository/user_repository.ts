import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { User } from "../../models/user";
import MySQLService from "../service/mysql_service";

// jamais le hachage du mot de passe dans les réponses
const PUBLIC_FIELDS = `
	user.id, user.firstname, user.lastname, user.email, user.telephone,
	user.adresse_livraison, user.adresse_facturation, user.role_id, user.created_at,
	role.name AS role_name
`;

const withRole = (row: RowDataPacket) => {
	const { role_name, ...user } = row;
	return { ...user, role: { id: user.role_id, name: role_name } } as User;
};

class User_Repository {
	public selectAll = async (): Promise<User[]> => {
		const db = await new MySQLService().connect();
		const [rows] = await db.execute<RowDataPacket[]>(
			`SELECT ${PUBLIC_FIELDS} FROM user JOIN role ON role.id = user.role_id ORDER BY user.id`,
		);
		return rows.map(withRole);
	};

	public selectOne = async (id: number): Promise<User | null> => {
		const db = await new MySQLService().connect();
		const [rows] = await db.execute<RowDataPacket[]>(
			`SELECT ${PUBLIC_FIELDS} FROM user JOIN role ON role.id = user.role_id WHERE user.id = :id`,
			{ id },
		);
		return rows[0] ? withRole(rows[0]) : null;
	};

	public updateRole = async (id: number, role_id: number) => {
		const db = await new MySQLService().connect();
		const [result] = await db.execute<ResultSetHeader>(
			"UPDATE user SET role_id = :role_id WHERE id = :id",
			{ id, role_id },
		);
		return result.affectedRows > 0;
	};
}

export default User_Repository;
