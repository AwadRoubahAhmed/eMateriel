import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { Contact } from "../../models/contact";
import MySQLService from "../service/mysql_service";

class ContactRepository {
	public selectAll = async (): Promise<Contact[]> => {
		const db = await new MySQLService().connect();
		const [rows] = await db.execute<RowDataPacket[]>(
			"SELECT * FROM contact ORDER BY created_at DESC, id DESC",
		);
		return rows as Contact[];
	};

	public insert = async (
		data: Pick<Contact, "name" | "email" | "subject" | "message">,
	) => {
		const db = await new MySQLService().connect();
		const [result] = await db.execute<ResultSetHeader>(
			`INSERT INTO contact (name, email, subject, message)
			 VALUES (:name, :email, :subject, :message)`,
			data,
		);
		return result.insertId;
	};

	public markRead = async (id: number, is_read: boolean) => {
		const db = await new MySQLService().connect();
		const [result] = await db.execute<ResultSetHeader>(
			"UPDATE contact SET is_read = :is_read WHERE id = :id",
			{ id, is_read },
		);
		return result.affectedRows > 0;
	};

	public delete = async (id: number) => {
		const db = await new MySQLService().connect();
		const [result] = await db.execute<ResultSetHeader>(
			"DELETE FROM contact WHERE id = :id",
			{ id },
		);
		return result.affectedRows > 0;
	};
}

export default ContactRepository;
