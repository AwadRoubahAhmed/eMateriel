import supertest from "supertest";
import Server from "../server/core/server";

// comptes de test créés par mysql/seed.sql
export const ADMIN_ACCOUNT = { email: "admin@emateriel.test", password: "Admin-Test-2026" };
export const CLIENT_ACCOUNT = { email: "client@emateriel.test", password: "Client-Test-2026" };

export const api = () => supertest(new Server().startServer());

export const login = async (account: { email: string; password: string }) => {
	const response = await api().post("/api/login").send(account);
	if (response.status !== 200) throw new Error(`login ${account.email}: ${response.status}`);
	return response.body.token as string;
};

export const bearer = (token: string) => ({ Authorization: `Bearer ${token}` });

// nouveau compte client à chaque appel (chaque test part d'un compte sans commande)
let counter = 0;
export const newClient = async () => {
	const account = { email: `client${Date.now()}-${++counter}@emateriel.test`, password: "Motdepasse1" };
	await api().post("/api/register").send(account);
	return login(account);
};
