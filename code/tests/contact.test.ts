import { describe, expect, it } from "vitest";
import { ADMIN_ACCOUNT, api, bearer, login } from "./helpers";

const message = {
	name: "Jeanne",
	email: "jeanne@example.com",
	subject: "Question livraison",
	message: "Bonjour, livrez-vous en Belgique ?",
};

describe("formulaire de contact", () => {
	it("enregistre un message visible dans le back-office", async () => {
		expect((await api().post("/api/contact").send(message)).status).toBe(201);

		const token = await login(ADMIN_ACCOUNT);
		const list = await api().get("/api/contact").set(bearer(token));
		const saved = list.body.data.find((m: { subject: string }) => m.subject === message.subject);
		expect(saved.email).toBe(message.email);

		expect((await api().patch(`/api/contact/${saved.id}`).set(bearer(token)).send({ is_read: true })).status).toBe(200);
		expect((await api().delete(`/api/contact/${saved.id}`).set(bearer(token))).status).toBe(200);
	});

	it("n'enregistre pas un message de robot (champ piège rempli)", async () => {
		const spam = { ...message, subject: "Spam robot", website: "http://spam.example" };
		// réponse identique pour ne pas renseigner le robot
		expect((await api().post("/api/contact").send(spam)).status).toBe(201);

		const token = await login(ADMIN_ACCOUNT);
		const list = await api().get("/api/contact").set(bearer(token));
		expect(list.body.data.some((m: { subject: string }) => m.subject === "Spam robot")).toBe(false);
	});

	it("refuse un message incomplet", async () => {
		expect((await api().post("/api/contact").send({ ...message, email: "x" })).status).toBe(400);
		expect((await api().post("/api/contact").send({ ...message, message: "court" })).status).toBe(400);
	});
});
