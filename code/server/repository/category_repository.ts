import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { Category } from "../../models/category";
import MySQLService from "../service/mysql_service";

class Category_Repository {
	public selectAll = async (): Promise<Category[]> => {
		const db = await new MySQLService().connect();
		const [rows] = await db.execute<RowDataPacket[]>(
			"SELECT * FROM category ORDER BY name",
		);
		return rows as Category[];
	};

	public selectOne = async (id: number): Promise<Category | null> => {
		const db = await new MySQLService().connect();
		const [rows] = await db.execute<RowDataPacket[]>(
			"SELECT * FROM category WHERE id = :id",
			{ id },
		);
		return (rows[0] as Category) ?? null;
	};

	public create = async (data: Pick<Category, "name" | "description">) => {
		const db = await new MySQLService().connect();
		const [result] = await db.execute<ResultSetHeader>(
			"INSERT INTO category (name, description) VALUES (:name, :description)",
			data,
		);
		return result.insertId;
	};

	public update = async (
		id: number,
		data: Pick<Category, "name" | "description">,
	) => {
		const db = await new MySQLService().connect();
		const [result] = await db.execute<ResultSetHeader>(
			"UPDATE category SET name = :name, description = :description WHERE id = :id",
			{ ...data, id },
		);
		return result.affectedRows > 0;
	};

	// les produits de la catégorie passent à category_id = NULL (ON DELETE SET NULL)
	public delete = async (id: number) => {
		const db = await new MySQLService().connect();
		const [result] = await db.execute<ResultSetHeader>(
			"DELETE FROM category WHERE id = :id",
			{ id },
		);
		return result.affectedRows > 0;
	};
}

export default Category_Repository;
