// Recrée la base MYSQL_DATABASE à partir de mysql/schema.sql + mysql/seed.sql.
// Usage : node --env-file=.env.development scripts/db-reset.mjs
// ATTENTION : efface toutes les données de cette base.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import mysql from "mysql2/promise";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const resetDatabase = async (env = process.env) => {
	const database = env.MYSQL_DATABASE;
	if (!database) throw new Error("MYSQL_DATABASE manquant");
	if (env.NODE_ENV === "production") throw new Error("Refus : base de production");

	const connection = await mysql.createConnection({
		host: env.MYSQL_HOST,
		port: Number(env.MYSQL_PORT ?? 3306),
		user: env.MYSQL_USER,
		password: env.MYSQL_PASSWORD,
		multipleStatements: true,
	});
	try {
		await connection.query(
			`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; USE \`${database}\`;`,
		);
		for (const file of ["schema.sql", "seed.sql"]) {
			await connection.query(await fs.readFile(path.join(root, "mysql", file), "utf8"));
		}
	} finally {
		await connection.end();
	}
};

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
	await resetDatabase();
	console.log(`Base ${process.env.MYSQL_DATABASE} recréée`);
}
