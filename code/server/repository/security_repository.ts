import type { ResultSetHeader, RowDataPacket } from "mysql2";
import MySQLService from "../service/mysql_service";

export type UserWithHash = {
	id: number;
	email: string;
	password: string;
	firstname: string | null;
	lastname: string | null;
	role: string;
};

class SecurityRepository {
	// tout nouveau compte est Client (role_id 2)
	public register = async (data: {
		email: string;
		password: string;
		firstname?: string;
		lastname?: string;
	}) => {
		const db = await new MySQLService().connect();
		const [result] = await db.execute<ResultSetHeader>(
			`INSERT INTO user (email, password, firstname, lastname, role_id)
			 VALUES (:email, :password, :firstname, :lastname, 2)`,
			{ firstname: null, lastname: null, ...data },
		);
		return result.insertId;
	};

	// avec le hachage : réservé à la vérification du mot de passe
	public selectOneByEmail = async (
		email: string,
	): Promise<UserWithHash | null> => {
		const db = await new MySQLService().connect();
		const [rows] = await db.execute<RowDataPacket[]>(
			`SELECT user.id, user.email, user.password, user.firstname, user.lastname, role.name AS role
			 FROM user JOIN role ON role.id = user.role_id WHERE user.email = :email`,
			{ email },
		);
		return (rows[0] as UserWithHash) ?? null;
	};
}

export default SecurityRepository;
