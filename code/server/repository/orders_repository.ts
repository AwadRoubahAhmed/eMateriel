import type { Orders } from "../../models/orders";
import type { Payment_methode } from "../../models/payment_methode";
import type { User } from "../../models/user";
import MySQLService from "../service/mysql_service";
import Payment_method_Repository from "./payment_method_repository";
import User_Repository from "./user_repository";

class Orders_Repository {
	//NOM DE LA TABLE SQL
	private table = "orders";
	//selectionner tous les enregistrements
	public selectAll = async (): Promise<Orders[] | unknown> => {
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
			for (let i = 0; i < (query as Orders[]).length; i++) {
				const result = (query as Orders[])[i] as Orders;

				// Clés étrangères
				result.user = (await new User_Repository().selectOne({
					id: result.user_id,
				})) as User;

				result.payment_method =
					(await new Payment_method_Repository().selectOne({
						id: result.payment_methode_id,
					})) as Payment_methode;
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
		data: Partial<Orders>,
	): Promise<Orders[] | unknown> => {
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
			const result = (query as Orders[]).shift() as Orders;

			// Clés étrangères
			result.user = (await new User_Repository().selectOne({
				id: result.user_id,
			})) as User;

			result.payment_method = (await new Payment_method_Repository().selectOne({
				id: result.payment_methode_id,
			})) as Payment_methode;

			//Retourner les resultats
			return result;
		} catch (error) {
			return error;
		}
	};
}

export default Orders_Repository;
