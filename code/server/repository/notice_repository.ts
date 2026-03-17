import type { Notice } from "../../models/notice";
import type { Product } from "../../models/product";
import MySQLService from "../service/mysql_service";
import Product_Repository from "./product_repository";

class Notice_Repository {
	//NOM DE LA TABLE SQL
	private table = "notice";

 
	//selectionner tous les enregistrements
	public selectAll = async (): Promise<Notice[] | unknown> => {
		//connexion au serveur MySQL
		const connection = await new MySQLService().connect();
		//requete SQL "SELECT reservation_status.* FROM profit_dev.reservation_status;"
		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table};
        `;
		// try / catch : tente et recupere moi resultat et ou l'erreur
		try {
			//execute la requette
			const [query] = await connection.execute(sql);

			// Boucler sur les resultats pour récupérer les clés étrangères;
			for (let i = 0; i < (query as Notice[]).length; i++) {
				const result = (query as Notice[])[i];

				// Clés étrangères
				result.product = (await new Product_Repository().selectOne({
					id: result.product_id,
				})) as Product;
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
		data: Partial<Notice>,
	): Promise<Notice[] | unknown> => {
		//connexion au serveur MySQL
		const connection = await new MySQLService().connect();
		//requete SQL "SELECT reservation_status.* FROM profit_dev.reservation_status;"
		//variable de requete : precedée d'un ":", suivi du nom de la variable
		//quand je fais des requetes avec des variables : "requete préparés" :securité donc la requete est executée si elle ne represente pas de risque de securite
		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE ${this.table}.id = :id
			; 
        `;
		// try / catch : tente et recupere moi resultat et ou l'erreur
		try {
			//execute la requette
			// si la requete possede des variables, utiliser le parametre de la methode
			const [query] = await connection.execute(sql, data);
			//recuperer le premier indice d'un array
			const result = (query as Notice[]).shift() as Notice;

			// Clés étrangères
			result.product = (await new Product_Repository().selectOne({
				id: result.product_id,
			})) as Product;
			//Retourner les resultats
			return result;
		} catch (error) {
			return error;
		}
	};

	// selectinlist
	public selectInList = async (list: string): Promise<Notice[] | unknown> => {
		//connexion au serveur MySQL
		const connection = await new MySQLService().connect();
		//requete SQL "SELECT reservation_status.* FROM profit_dev.reservation_status;"
		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE  ${this.table}.id IN (${list});
			;
        `;
		// try / catch : tente et recupere moi resultat et ou l'erreur
		try {
			//execute la requette
			const [query] = await connection.execute(sql);
			
			//Retourner les resultats
			return query;
		} catch (error) {
			return error;
		}
	};
}

export default Notice_Repository;
