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
			GROUP_CONCAT(notice.id) AS notice_ids
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			LEFT JOIN ${process.env.MYSQL_DATABASE}.notice 
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
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			LEFT JOIN ${process.env.MYSQL_DATABASE}.notice
			ON ${this.table}.id = notice.product_id
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

			// Clés étrangères category_id
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
		//requete SQL "SELECT product.* FROM product WHERE product.id IN (list);"
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

		//requete SQL
		const sql = `
            INSERT INTO ${process.env.MYSQL_DATABASE}.${this.table}
			(id, name, image, price, description, stock, category_id)
			VALUES  
			(NULL, :name, :image, :price, :description, :stock, :category_id)
            ;
        `;
		// try / catch : tente et recupere moi resultat et ou l'erreur
		try {

			// demarer la transaction
			//connection.beginTransaction();

			// execute la requette;
			const [query] = await connection.execute(sql, data);	

			//execute la requette
			// si la requete possede des variables, utiliser le parametre de la methode;
			//const [query] = await connection.execute(sql, data);
			 
			// deuxieme requete;
			//sql = ` SET @id = LAST_INSERT_ID();`
			//const [query] = await connection.execute(sql);

			// troisieme requete;
			// split : couper une chaine de caractere en plusieurs sous chaines;
			//const joinIds = (data.notice_ids as string).split(",")
			//.map((value) => `(${value}, @id)`)
			//.join(", ");
			//sql = ` INSERT INTO ${process.env.MYSQL_DATABASE}.notice_product
			// VALUE 
			// ${joinIds}  ;`
			//const [query] = await connection.execute(sql);

			// valider la transaction;
			//connection.commit();

			//Retourner les resultats;
			return query;
		} catch (error) {
			// annuler la transaction en cas d'erreur;
			//connection.rollback();
			return error;
		}
	};

	// Mettre a jour un enregistrement;
	public update = async (
		data: Partial<Product>,
	): Promise<QueryResult | unknown> => {

		//connexion au serveur MySQL
		const connection = await new MySQLService().connect();

		//requete SQL "SELECT reservation_status.* FROM profit_dev.reservation_status;"
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
		// try / catch : tente et recupere moi resultat et ou l'erreur
		try {

			// demarer la transaction
			//connection.beginTransaction();

			// execute la requette;
			const [query] = await connection.execute(sql, data);	

			//execute premiere requette
			// si la requete possede des variables, utiliser le parametre de la methode;
			//const [query] = await connection.execute(sql, data);
			// await connection.execute(sql, data)
			
			// deuxieme requete Update / Delete;
			//sql = ` SET @id = LAST_INSERT_ID();`
			//sql = ` DELETE FROM
			//  ${process.env.MYSQL_DATABASE}.${this.table} // supprimer la table jointure;
			// WHERE dish_menu.menu_id = id;`
			//
			//sql = ` DELETE FROM
			//  ${process.env.MYSQL_DATABASE}.${this.table}
			// WHERE ${this.table}.id = id;`
			//const [query] = await connection.execute(sql);

			// troisieme requete Insert;
			// split : couper une chaine de caractere en plusieurs sous chaines;
			//const joinIds = (data.notice_ids as string).split(",")
			//.map((value) => `(${value}, @id)`)
			////.map((value) => `(${value}, id)`) // pour Inserer
			//.join(", ");
			//sql = ` INSERT INTO ${process.env.MYSQL_DATABASE}.notice_product
			// VALUE
			// ${joinIds}  ;`
			
			// Mettre le quey dans la derniere requete
			//const [query] = await connection.execute(sql);

			// valider la transaction;
			//connection.commit();

			//Retourner les resultats;
			return query;
		} catch (error) {
			// annuler la transaction en cas d'erreur;
			//connection.rollback();
			return error;
		}
	};

	// Supprimer un enregistrement;
	public delete = async (
		data: Partial<Product>,
	): Promise<QueryResult | unknown> => {

		//connexion au serveur MySQL
		const connection = await new MySQLService().connect();

		//requete SQL "SELECT reservation_status.* FROM profit_dev.reservation_status;"
		// Supprime les notices associées au produit
		let sql = `
            DELETE FROM ${process.env.MYSQL_DATABASE}.notice
			  WHERE 
			   notice.product_id = :id
            ;
        `;

		// DELETE ${process.env.MYSQL_DATABASE}.${this.table}
		// 	  WHERE
		// 	   ${this.table}.id = :id
		//     ;
		

		// try / catch : tente et recupere moi resultat et ou l'erreur
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

			//execute premiere requette
			// si la requete possede des variables, utiliser le parametre de la methode;
			//const [query] = await connection.execute(sql, data);
			// await connection.execute(sql, data)
			
			// deuxieme requete Update / Delete;
			//sql = ` SET @id = LAST_INSERT_ID();`
			//sql = ` DELETE FROM
			//  ${process.env.MYSQL_DATABASE}.${this.table} // supprimer la table jointure;
			// WHERE dish_menu.menu_id = id;`
			//
			//sql = ` DELETE FROM
			//  ${process.env.MYSQL_DATABASE}.${this.table}
			// WHERE ${this.table}.id = id;`
			//const [query] = await connection.execute(sql);

			// troisieme requete Insert;
			// split : couper une chaine de caractere en plusieurs sous chaines;
			//const joinIds = (data.notice_ids as string).split(",")
			//.map((value) => `(${value}, @id)`)
			////.map((value) => `(${value}, id)`) // pour Inserer
			//.join(", ");
			//sql = ` INSERT INTO ${process.env.MYSQL_DATABASE}.notice_product
			// VALUE
			// ${joinIds}  ;`
			
			// Mettre le query dans la derniere requete
			//const [query] = await connection.execute(sql);

			// valider la transaction;
			connection.commit();

			//Retourner les resultats;
			return query;
		} catch (error) {
			// annuler la transaction en cas d'erreur;
			connection.rollback();
			return error;
		}
	};
}

export default Product_Repository;
