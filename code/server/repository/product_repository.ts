import type { QueryResult } from "mysql2";
import type { Category } from "../../models/category";
import type { Product } from "../../models/product";
import MySQLService from "../service/mysql_service";
import Category_Repository from "./category_repository";

class Product_Repository {
	//NOM DE LA TABLE SQL
	private table = "product";
	//selectionner tous les enregistrements
	public selectAll = async (): Promise<Product[] | unknown> => {
		//connexion au serveur MySQL
		const connection = await new MySQLService().connect();
		//requete SQL "SELECT reservation_status.* FROM profit_dev.reservation_status;"
		const sql = `
            SELECT ${this.table}.*,
			GROUP_CONCAT(notice.id) AS notice_ids,
            FROM ${process.env.MYSQL_DATABASE}.${this.table},
			JOIN ${process.env.MYSQL_DATABASE}.notice,
			ON ${this.table}.id = notice.product_id
			GROUP BY ${this.table}.id
			;
        `;
		// try / catch : tente et recupere moi resultat et ou l'erreur
		try {
			//execute la requette
			const [query] = await connection.execute(sql);

			// Boucler sur les resultats pour récupérer les clés étrangères;
			for (let i = 0; i < (query as Product[]).length; i++) {
				const result = (query as Product[])[i];

				// Clés étrangères
				result.category = (await new Category_Repository().selectOne({
					id: result.category_id,
				})) as Category;
			}
			//Retourner les resultats
			return query;
		} catch (error) {
			return error;
		}
	};

	//selectionner un enregistrement
	//data represente unepartie des proprietésdu type grace au PARTIAL
	public selectOne = async (
		data: Partial<Product>,
	): Promise<Product[] | unknown> => {
		//connexion au serveur MySQL
		const connection = await new MySQLService().connect();
		//requete SQL "SELECT reservation_status.* FROM profit_dev.reservation_status;"
		//variable de requete : precedée d'un ":", suivi du nom de la variable
		//quand je fais des requetes avec des variables : "requete préparés" :securité donc la requete est executée si elle ne represente pas de risque de securite
		const sql = `
            SELECT ${this.table}.*,
            FROM ${process.env.MYSQL_DATABASE}.${this.table},
			JOIN ${process.env.MYSQL_DATABASE}.notice,
			ON ${this.table}.id = notice.product_id,
			WHERE ${this.table}.id = :id
			; 
        `;
		// try / catch : tente et recupere moi resultat et ou l'erreur
		try {
			//execute la requette
			// si la requete possede des variables, utiliser le parametre de la methode
			const [query] = await connection.execute(sql, data);
			//recuperer le premier indice d'un array
			const result = (query as Product[]).shift() as Product;

			// Clés étrangères
			result.category = (await new Category_Repository().selectOne({
				id: result.category_id,
			})) as Category;

			//Retourner les resultats
			return result;
		} catch (error) {
			return error;
		}
	};

	// selectinlist
	public selectInList = async (list: string): Promise<Product[] | unknown> => {
		//connexion au serveur MySQL
		const connection = await new MySQLService().connect();
		//requete SQL "SELECT reservation_status.* FROM profit_dev.reservation_status;"
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
		// try / catch : tente et recupere moi resultat et ou l'erreur
		try {
			//execute la requette
			const [query] = await connection.execute(sql);

			// Boucler sur les resultats pour récupérer les clés étrangères;
			// for (let i = 0; i < (query as Product[]).length; i++) {
			// 	const result = (query as Product[])[i];

			// 	// Clés étrangères
			// 	result.category = (await new Category_Repository().selectOne({
			// 		id: result.category_id,
			// 	})) as Category;
			// }
			//Retourner les resultats
			return query;
		} catch (error) {
			return error;
		}
	};

	// Inserer un enregistrement;
	public insert = async (
		data: Partial<Product>,
	): Promise<QueryResult | unknown> => {
		//connexion au serveur MySQL
		const connection = await new MySQLService().connect();
		//requete SQL "SELECT reservation_status.* FROM profit_dev.reservation_status;"
		const sql = `
            INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table}
			VALUE (
			       NULL,
				   :name,
				   :image,
				   :price
				   :description,
				   :stock,
				   :category_id

			)
            ;
        `;
		// try / catch : tente et recupere moi resultat et ou l'erreur
		try {
			//execute la requette
			// si la requete possede des variables, utiliser le parametre de la methode;
			const [query] = await connection.execute(sql, data);

			//Retourner les resultats;
			return query;
		} catch (error) {
			return error;
		}
	};
}

export default Product_Repository;
