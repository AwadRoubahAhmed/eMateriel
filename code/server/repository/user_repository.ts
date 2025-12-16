import type { Role } from "../../models/role";
import type { User } from "../../models/user";
import MySQLService from "../service/mysql_service";
import Role_Repository from "./role_repository";

class User_Repository {
	//NOM DE LA TABLE SQL
	private table = "user";
	//selectionner tous les enregistrements
	public selectAll = async (): Promise<User[] | unknown> => {
		//connexion au serveur MySQL
		const connection = await new MySQLService().connect();
		//requete SQL "SELECT user.* FROM emateriel_dev.user;"
		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table};
        `;
		// try / catch : tente et recupere moi resultat et ou l'erreur
		try {
			//execute la requette
			const [query] = await connection.execute(sql);
			console.log(query);

			// Boucler sur les resultats pour récupérer les clés étrangères;
			for (let i = 0; i < (query as User[]).length; i++) {
				const result = (query as User[])[i] as User;

				// Clés étrangères
				result.role = (await new Role_Repository().selectOne({
					id: result.role_id,
				})) as Role;
			}

			//Retourner les resultats
			return query;
		} catch (error) {
			return error;
		}
	};

	//selectionner un enregistrement
	//data represente unepartie des proprietésdu type grace au PARTIAL
	public selectOne = async (data: Partial<User>): Promise<User[] | unknown> => {
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
			const result = (query as User[]).shift() as User;

			// Clés étrangères
			result.role = (await new Role_Repository().selectOne({
				id: result.role_id,
			})) as Role;

			//Retourner les resultats
			return result;
		} catch (error) {
			return error;
		}
	};
}

export default User_Repository;
