import type { QueryResult } from "mysql2";
import type { Category } from "../../models/category";
import type { Product } from "../../models/product";
import MySQLService from "../service/mysql_service";
import Category_Repository from "./category_repository";

class Product_Repository {
	private table = "product";
	public selectAll = async (): Promise<Product[] | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
            SELECT ${this.table}.*,
			GROUP_CONCAT(notice.id) AS notice_ids
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			LEFT JOIN ${process.env.MYSQL_DATABASE}.notice 
			ON ${this.table}.id = notice.product_id
			GROUP BY ${this.table}.id
			; 
        `;

		try {
			const [query] = await connection.execute(sql);

			// Boucler sur les resultats pour récupérer les clés étrangères;
			for (let i = 0; i < (query as Product[]).length; i++) {
				const result = (query as Product[])[i];

				// Clés étrangères
				result.category = (await new Category_Repository().selectOne({
					id: result.category_id,
				})) as Category;
			}
			return query;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (
		data: Partial<Product>,
	): Promise<Product[] | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			LEFT JOIN ${process.env.MYSQL_DATABASE}.notice
			ON ${this.table}.id = notice.product_id
			WHERE ${this.table}.id = :id
			; 
        `;

		try {
			const [query] = await connection.execute(sql, data);

			const result = (query as Product[]).shift() as Product;

			if (!result) return null;

			// Clés étrangères category_id
			result.category = (await new Category_Repository().selectOne({
				id: result.category_id,
			})) as Category;

			return result;
		} catch (error) {
			return error;
		}
	};

	public selectInList = async (list: string): Promise<Product[] | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
            SELECT ${this.table}.*,
			GROUP_CONCAT(notice.id) AS notice_ids
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			LEFT JOIN ${process.env.MYSQL_DATABASE}.notice
			ON ${this.table}.id = notice.product_id
			WHERE  ${this.table}.id IN (${list})
			GROUP BY ${this.table}.id
			;
        `;

		try {
			const [query] = await connection.execute(sql);

			return query;
		} catch (error) {
			return error;
		}
	};

	public insert = async (
		data: Partial<Product>,
	): Promise<QueryResult | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
            INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table}
			(id, name, image, price, description, stock, category_id)
			VALUES  
			(NULL, :name, :image, :price, :description, :stock, :category_id)
            ;
        `;

		try {
			const [query] = await connection.execute(sql, data);

			return query;
		} catch (error) {
			return error;
		}
	};

	public update = async (
		data: Partial<Product>,
	): Promise<QueryResult | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
            UPDATE ${process.env.MYSQL_DATABASE}.${this.table}
			SET  
			   ${this.table}.name = :name, 
			    ${this.table}.image = :image, 
			    ${this.table}.price = :price, 
			    ${this.table}.description = :description, 
			    ${this.table}.stock = :stock, 
			    ${this.table}.category_id = :category_id
			WHERE 
			   ${this.table}.id = :id
            ;
        `;

		try {
			const [query] = await connection.execute(sql, data);

			return query;
		} catch (error) {
			return error;
		}
	};

	public delete = async (
		data: Partial<Product>,
	): Promise<QueryResult | unknown> => {
		const connection = await new MySQLService().connect();

		let sql = `
            DELETE FROM ${process.env.MYSQL_DATABASE}.notice
			  WHERE 
			   notice.product_id = :id
            ;
        `;

		try {
			// demarer la transaction
			connection.beginTransaction();

			// execute la premiere requette (Delete notice);
			await connection.execute(sql, data);

			// Supprime les lignes de commande associées au produit
			sql = `
            DELETE FROM ${process.env.MYSQL_DATABASE}.line_order
			  WHERE 
			   line_order.product_id = :id
            ;
        `;
			// execute la deuxieme requette (Delete line_order);
			await connection.execute(sql, data);

			// Supprime le produit lui-même
			sql = `
             DELETE FROM ${process.env.MYSQL_DATABASE}.${this.table}
		        WHERE
			   ${this.table}.id = :id
		    ;
        `;
			// execute la troisieme requette (Delete product);
			const [query] = await connection.execute(sql, data);

			connection.commit();

			return query;
		} catch (error) {
			// annuler la transaction en cas d'erreur;
			connection.rollback();
			return error;
		}
	};
}

export default Product_Repository;
