import fs from "node:fs/promises";
import path from "node:path";
import mysql, { type RowDataPacket } from "mysql2/promise";
import { passwordSchema } from "../validation/schemas";
import { hashPassword } from "./password_service";

// Premier démarrage en production (DB_AUTO_INIT=true) : crée les tables et le catalogue de
// démonstration si la base est vide, puis le compte admin (ADMIN_EMAIL / ADMIN_PASSWORD).
// Ne touche jamais une base qui contient déjà des tables ; ne charge jamais les comptes de test.
export const initDatabase = async (env = process.env) => {
	const connection = await mysql.createConnection({
		host: env.MYSQL_HOST,
		port: Number(env.MYSQL_PORT ?? 3306),
		user: env.MYSQL_USER,
		password: env.MYSQL_PASSWORD,
		database: env.MYSQL_DATABASE,
		multipleStatements: true,
	});
	try {
		const [tables] = await connection.query<RowDataPacket[]>("SHOW TABLES LIKE 'product'");
		if (tables.length === 0) {
			for (const file of ["schema.sql", "seed.sql"]) {
				await connection.query(await fs.readFile(path.resolve("mysql", file), "utf8"));
			}
			console.log("Base initialisée (tables + catalogue de démonstration)");
		}

		const [admins] = await connection.query<RowDataPacket[]>("SELECT id FROM user WHERE role_id = 1 LIMIT 1");
		if (admins.length === 0 && env.ADMIN_EMAIL && env.ADMIN_PASSWORD) {
			// même exigence qu'à l'inscription : pas de mot de passe faible pour l'admin
			passwordSchema.parse(env.ADMIN_PASSWORD);
			await connection.execute(
				"INSERT INTO user (email, password, firstname, role_id) VALUES (?, ?, 'Admin', 1)",
				[env.ADMIN_EMAIL.trim().toLowerCase(), await hashPassword(env.ADMIN_PASSWORD)],
			);
			console.log(`Compte administrateur créé : ${env.ADMIN_EMAIL}`);
		}
	} finally {
		await connection.end();
	}
};
