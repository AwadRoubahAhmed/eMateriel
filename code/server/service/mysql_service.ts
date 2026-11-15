import mysql, { type Pool, type PoolConnection } from "mysql2/promise";

class MySQLService {
	// un seul pool partagé : chaque requête prend une connexion libre
	private static pool: Pool;

	public connect = async (): Promise<Pool> => {
		if (!MySQLService.pool) {
			MySQLService.pool = mysql.createPool({
				namedPlaceholders: true,
				host: process.env.MYSQL_HOST,
				port: Number(process.env.MYSQL_PORT ?? 3306),
				user: process.env.MYSQL_USER,
				password: process.env.MYSQL_PASSWORD,
				database: process.env.MYSQL_DATABASE,
				// DECIMAL renvoyé en nombre (prix, totaux)
				decimalNumbers: true,
				connectionLimit: 10,
			});
		}
		return MySQLService.pool;
	};

	// exécuter plusieurs requêtes dans une transaction (tout ou rien)
	public transaction = async <T>(
		work: (connection: PoolConnection) => Promise<T>,
	): Promise<T> => {
		const connection = await (await this.connect()).getConnection();
		try {
			await connection.beginTransaction();
			const result = await work(connection);
			await connection.commit();
			return result;
		} catch (error) {
			await connection.rollback();
			throw error;
		} finally {
			connection.release();
		}
	};
}

export default MySQLService;
