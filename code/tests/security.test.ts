import { describe, expect, it } from "vitest";
import { ADMIN_ACCOUNT, api, bearer, CLIENT_ACCOUNT, login } from "./helpers";

describe("inscription et connexion", () => {
	it("crée un compte client et refuse un doublon", async () => {
		const account = { email: "nouveau@emateriel.test", password: "Motdepasse1" };
		const created = await api().post("/api/register").send(account);
		expect(created.status).toBe(201);

		const duplicate = await api().post("/api/register").send(account);
		expect(duplicate.status).toBe(409);

		const token = await login(account);
		const me = await api().get("/api/user/me").set(bearer(token));
		expect(me.body.data.role.name).toBe("Client");
	});

	it("refuse un mot de passe faible ou un email invalide", async () => {
		const weak = await api().post("/api/register").send({ email: "a@b.fr", password: "court" });
		expect(weak.status).toBe(400);
		const badEmail = await api().post("/api/register").send({ email: "pas-un-email", password: "Motdepasse1" });
		expect(badEmail.status).toBe(400);
	});

	it("ignore un rôle envoyé par le client à l'inscription", async () => {
		const account = { email: "pirate@emateriel.test", password: "Motdepasse1", role_id: 1 };
		await api().post("/api/register").send(account);
		const token = await login(account);
		const users = await api().get("/api/user").set(bearer(token));
		expect(users.status).toBe(403);
	});

	it("connecte avec le bon mot de passe, sans renvoyer le hachage", async () => {
		const response = await api().post("/api/login").send(ADMIN_ACCOUNT);
		expect(response.status).toBe(200);
		expect(response.body.token).toBeTruthy();
		expect(response.body.data.password).toBeUndefined();
		expect(response.body.data.role.name).toBe("Administrateur");
	});

	it("donne le même message pour un email inconnu et un mauvais mot de passe", async () => {
		const wrongPassword = await api().post("/api/login").send({ ...CLIENT_ACCOUNT, password: "Mauvais123" });
		const unknown = await api().post("/api/login").send({ email: "inconnu@emateriel.test", password: "Mauvais123" });
		expect(wrongPassword.status).toBe(401);
		expect(unknown.status).toBe(401);
		expect(wrongPassword.body.message).toBe(unknown.body.message);
	});

	it("refuse un jeton falsifié", async () => {
		const response = await api().get("/api/user/me").set(bearer("abc.def.ghi"));
		expect(response.status).toBe(401);
	});
});

describe("accès administrateur", () => {
	const adminRoutes: [string, string][] = [
		["get", "/api/user"],
		["get", "/api/orders"],
		["get", "/api/contact"],
		["post", "/api/category"],
		["put", "/api/category/1"],
		["delete", "/api/category/1"],
		["post", "/api/product"],
		["delete", "/api/product/1"],
		["patch", "/api/product/1/stock"],
		["patch", "/api/orders/1/status"],
		["patch", "/api/user/1/role"],
	];

	it.each(adminRoutes)("%s %s : 401 sans connexion", async (method, url) => {
		const response = await (api() as never as Record<string, (u: string) => Promise<{ status: number }>>)[method](url);
		expect(response.status).toBe(401);
	});

	it.each(adminRoutes)("%s %s : 403 pour un client", async (method, url) => {
		const token = await login(CLIENT_ACCOUNT);
		const agent = api() as never as Record<string, (u: string) => { set: (h: object) => Promise<{ status: number }> }>;
		const response = await agent[method](url).set(bearer(token));
		expect(response.status).toBe(403);
	});

	it("liste les utilisateurs sans aucun mot de passe", async () => {
		const token = await login(ADMIN_ACCOUNT);
		const response = await api().get("/api/user").set(bearer(token));
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBeGreaterThan(1);
		for (const user of response.body.data) expect(user.password).toBeUndefined();
	});

	it("empêche un admin de changer son propre rôle", async () => {
		const token = await login(ADMIN_ACCOUNT);
		const response = await api().patch("/api/user/1/role").set(bearer(token)).send({ role_id: 2 });
		expect(response.status).toBe(409);
	});
});

describe("en-têtes et erreurs", () => {
	it("ajoute les en-têtes de sécurité et masque Express", async () => {
		const response = await api().get("/api/");
		expect(response.headers["x-content-type-options"]).toBe("nosniff");
		expect(response.headers["x-powered-by"]).toBeUndefined();
	});

	it("répond 404 en JSON sur une route d'API inconnue", async () => {
		const response = await api().get("/api/nexiste-pas");
		expect(response.status).toBe(404);
	});

	it("répond 400 sur un identifiant invalide", async () => {
		const response = await api().get("/api/product/abc");
		expect(response.status).toBe(400);
	});
});

describe("droits relus en base", () => {
	it("retire immédiatement l'accès admin d'un compte rétrogradé (même avec un jeton encore valide)", async () => {
		const account = { email: "promu@emateriel.test", password: "Motdepasse1" };
		await api().post("/api/register").send(account);
		const admin = await login(ADMIN_ACCOUNT);
		const me = await api().get("/api/user/me").set(bearer(await login(account)));
		await api().patch(`/api/user/${me.body.data.id}/role`).set(bearer(admin)).send({ role_id: 1 });

		const promotedToken = await login(account);
		expect((await api().get("/api/user").set(bearer(promotedToken))).status).toBe(200);

		await api().patch(`/api/user/${me.body.data.id}/role`).set(bearer(admin)).send({ role_id: 2 });
		expect((await api().get("/api/user").set(bearer(promotedToken))).status).toBe(403);
	});
});
