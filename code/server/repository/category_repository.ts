import type { ResultSetHeader } from "mysql2";
import type { Category } from "../../models/category";
import type { Product } from "../../models/product";
import MySQLService from "../service/mysql_service";
import Product_Repository from "./product_repository";

class Category_Repository {
	//NOM DE LA TABLE SQL
	private table = "category";

	//selectionner tous les enregistrements
	public selectAll = async (): Promise<Category[] | unknown> => {
		//connexion au serveur MySQL
		const connection = await new MySQLService().connect();
		const sql = `
            SELECT
			${this.table}.*, 
			GROUP_CONCAT(product.id) AS product_ids 
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			LEFT JOIN ${process.env.MYSQL_DATABASE}.product
			ON ${this.table}.id = product.category_id
			GROUP BY ${this.table}.id
			;
        `;
		// try / catch : tente et recupere moi resultat et ou l'erreur
		try {
			//execute la requette
			const [query] = await connection.execute(sql);

			// Boucler sur les resultats pour récupérer les clés étrangères;
			for (let i = 0; i < (query as Category[]).length; i++) {
				const result = (query as Category[])[i];

				// Clés étrangères
				result.products = (await new Product_Repository().selectInList(
					result.product_ids,
				)) as Product[];
			}

			//Retourner les resultats
			return query;
		} catch (error) {
			return error;
		}
	};

	//selectionner un enregistrement
	public selectOne = async (
		data: Partial<Category>,
	): Promise<Category | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
		SELECT *
		FROM ${process.env.MYSQL_DATABASE}.${this.table}
		WHERE id = :id;
	`;

		try {
			const [query] = await connection.execute(sql, data);

			const resultat = (query as Category[]).shift();

			return resultat;
		} catch (error) {
			return error;
		}
	};

	public create = async (
		data: Partial<Category>,
	): Promise<number | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
			INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table}
			(name, description)
			VALUES (:name, :description);
		`;

		try {
			const [result] = await connection.execute<ResultSetHeader>(sql, data);
			return result.insertId; // retourne l'id créé
		} catch (error) {
			return error;
		}
	};

	public update = async (
		id: number,
		data: Partial<Category>,
	): Promise<boolean | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
			UPDATE ${process.env.MYSQL_DATABASE}.${this.table}
			SET
				name = :name,
				description = :description
			WHERE id = :id;
		`;

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

	public delete = async (id: number): Promise<boolean | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
			DELETE FROM ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE id = :id;
		`;

		try {
			const [result] = await connection.execute<ResultSetHeader>(sql, { id });
			return result.affectedRows > 0;
		} catch (error) {
			return error;
		}
	};
}

export default Category_Repository;
