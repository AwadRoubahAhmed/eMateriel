import mysql, { type PoolConnection } from "mysql2/promise";

class MySQLService {
    //proprieté statique : accesible sans object
    private static instance: PoolConnection;

    //connexion au serveur MySQL
    public connect = async () => {
        //si aucune connexion n'existe
        if (!MySQLService.instance) {
            MySQLService.instance = await mysql
                .createPool({
                    namedPlaceholders: true,
                    host: process.env.MYSQL_HOST,
                    user: process.env.MYSQL_USER,
                    password: process.env.MYSQL_PASSWORD,
                    database: process.env.MYSQL_DATABASE,
                })
                .getConnection();
        }

        return MySQLService.instance;
    };
}

export default MySQLService;