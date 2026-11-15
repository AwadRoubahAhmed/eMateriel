import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { Product } from "../../models/product";
import MySQLService from "../service/mysql_service";

export type ProductInput = Pick<
	Product,
	"name" | "image" | "price" | "description" | "stock" | "category_id"
>;

// produit + nom de sa catégorie en une seule requête
const SELECT = `
	SELECT product.*, category.name AS category_name
	FROM product
	LEFT JOIN category ON category.id = product.category_id
`;

const withCategory = (row: RowDataPacket) => {
	const { category_name, ...product } = row;
	return {
		...product,
		category: product.category_id
			? { id: product.category_id, name: category_name }
			: null,
	} as Product;
};

class Product_Repository {
	public selectAll = async (categoryId?: number): Promise<Product[]> => {
		const db = await new MySQLService().connect();
		const [rows] = categoryId
			? await db.execute<RowDataPacket[]>(
					`${SELECT} WHERE product.category_id = :categoryId ORDER BY product.id`,
					{ categoryId },
				)
			: await db.execute<RowDataPacket[]>(`${SELECT} ORDER BY product.id`);
		return rows.map(withCategory);
	};

	public selectOne = async (id: number): Promise<Product | null> => {
		const db = await new MySQLService().connect();
		const [rows] = await db.execute<RowDataPacket[]>(
			`${SELECT} WHERE product.id = :id`,
			{ id },
		);
		return rows[0] ? withCategory(rows[0]) : null;
	};

	public insert = async (data: ProductInput) => {
		const db = await new MySQLService().connect();
		const [result] = await db.execute<ResultSetHeader>(
			`INSERT INTO product (name, image, price, description, stock, category_id)
			 VALUES (:name, :image, :price, :description, :stock, :category_id)`,
			data,
		);
		return result.insertId;
	};

	public update = async (id: number, data: ProductInput) => {
		const db = await new MySQLService().connect();
		const [result] = await db.execute<ResultSetHeader>(
			`UPDATE product SET name = :name, image = :image, price = :price,
			 description = :description, stock = :stock, category_id = :category_id
			 WHERE id = :id`,
			{ ...data, id },
		);
		return result.affectedRows > 0;
	};

	public isImageUsed = async (image: string) => {
		const db = await new MySQLService().connect();
		const [rows] = await db.execute<RowDataPacket[]>(
			"SELECT 1 FROM product WHERE image = :image LIMIT 1",
			{ image },
		);
		return rows.length > 0;
	};

	public updateStock = async (id: number, stock: number) => {
		const db = await new MySQLService().connect();
		const [result] = await db.execute<ResultSetHeader>(
			"UPDATE product SET stock = :stock WHERE id = :id",
			{ id, stock },
		);
		return result.affectedRows > 0;
	};

	// les lignes de commande gardent nom et prix (product_id passe à NULL)
	public delete = async (id: number) => {
		const db = await new MySQLService().connect();
		const [result] = await db.execute<ResultSetHeader>(
			"DELETE FROM product WHERE id = :id",
			{ id },
		);
		return result.affectedRows > 0;
	};
}

export default Product_Repository;
