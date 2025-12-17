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
		//requete SQL "SELECT reservation_status.* FROM profit_dev.reservation_status;"
		const sql = `
            SELECT
			${this.table}.*, 
			GROUP_CONCAT(product.id) AS product_ids 
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			JOIN ${process.env.MYSQL_DATABASE}.product
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
	//data represente unepartie des proprietésdu type grace au PARTIAL
	public selectOne = async (
		data: Partial<Category>,
	): Promise<Category[] | unknown> => {
		//connexion au serveur MySQL
		const connection = await new MySQLService().connect();
		//requete SQL "SELECT reservation_status.* FROM profit_dev.reservation_status;"
		//variable de requete : precedée d'un ":", suivi du nom de la variable
		//quand je fais des requetes avec des variables : "requete préparés" :securité donc la requete est executée si elle ne represente pas de risque de securite
		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			JOIN ${process.env.MYSQL_DATABASE}.product
			ON ${this.table}.id = product.category_id
			WHERE ${this.table}.id = :id
			; 
        `;
		// try / catch : tente et recupere moi resultat et ou l'erreur
		try {
			//execute la requette
			// si la requete possede des variables, utiliser le parametre de la methode
			const [query] = await connection.execute(sql, data);
			//recuperer le premier indice d'un array
			const resultat = (query as Category[]).shift();
			//Retourner les resultats
			return resultat;
		} catch (error) {
			return error;
		}
	};
}

export default Category_Repository;
