import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ADMIN_ACCOUNT, api, bearer, login, newClient } from "./helpers";

const shipping = {
	name: "Client Test",
	address: "10 rue de la Paix",
	zip: "75002",
	city: "Paris",
	phone: "0601020304",
};

// Stripe simulé : on vérifie ce que le serveur lui envoie, sans appel réseau
let stripeCalls: { url: string; body: string }[] = [];
let paymentStatus = "unpaid";
let expired = false;
const realFetch = globalThis.fetch;

beforeEach(() => {
	stripeCalls = [];
	paymentStatus = "unpaid";
	expired = false;
	vi.spyOn(globalThis, "fetch").mockImplementation(async (input, init) => {
		const url = String(input);
		if (!url.startsWith("https://api.stripe.com")) return realFetch(input, init);
		stripeCalls.push({ url, body: String(init?.body ?? "") });
		if (url.endsWith("/expire")) {
			expired = true;
			return Response.json({ status: "expired" });
		}
		if (init?.method === "POST") {
			return Response.json({ id: `cs_test_${stripeCalls.length}`, url: "https://checkout.stripe.com/c/pay/test" });
		}
		const orderId = new URLSearchParams(stripeCalls[0]?.body).get("metadata[order_id]");
		return Response.json({ status: expired ? "expired" : paymentStatus === "paid" ? "complete" : "open", payment_status: paymentStatus, metadata: { order_id: orderId } });
	});
});

afterEach(() => vi.restoreAllMocks());

const stockOf = async (id: number) => (await api().get(`/api/product/${id}`)).body.data.stock as number;

describe("commande et paiement", () => {
	it("refuse une commande sans connexion", async () => {
		const response = await api().post("/api/orders").send({ items: [{ product_id: 1, qty: 1 }], shipping });
		expect(response.status).toBe(401);
	});

	it("calcule le total côté serveur, réserve le stock et ouvre Stripe", async () => {
		const token = await newClient();
		const before = await stockOf(1);
		const price = (await api().get("/api/product/1")).body.data.price as number;

		const response = await api()
			.post("/api/orders")
			.set(bearer(token))
			// prix et total envoyés par un client malveillant : ignorés
			.send({ items: [{ product_id: 1, qty: 2, price: 1 }], total: 1, shipping });

		expect(response.status).toBe(201);
		expect(response.body.data.total).toBe(price * 2);
		expect(response.body.data.checkout_url).toContain("checkout.stripe.com");
		expect(await stockOf(1)).toBe(before - 2);

		const sent = new URLSearchParams(stripeCalls[0].body);
		expect(sent.get("line_items[0][price_data][unit_amount]")).toBe(String(Math.round(price * 100)));
		expect(sent.get("line_items[0][quantity]")).toBe("2");
	});

	it("passe la commande en « payée » seulement si Stripe le confirme", async () => {
		const token = await newClient();
		const { body } = await api().post("/api/orders").set(bearer(token)).send({ items: [{ product_id: 2, qty: 1 }], shipping });
		const id = body.data.id;

		const notPaid = await api().post(`/api/orders/${id}/confirm`).set(bearer(token));
		expect(notPaid.body.data.status).toBe("en_attente");

		paymentStatus = "paid";
		const paid = await api().post(`/api/orders/${id}/confirm`).set(bearer(token));
		expect(paid.body.data.status).toBe("payee");

		const mine = await api().get("/api/orders/mine").set(bearer(token));
		const order = mine.body.data.find((o: { id: number }) => o.id === id);
		expect(order.status).toBe("payee");
		expect(order.line_orders[0].product_name).toBeTruthy();
	});

	it("refuse une quantité supérieure au stock", async () => {
		const token = await newClient();
		const stock = await stockOf(7);
		const response = await api()
			.post("/api/orders")
			.set(bearer(token))
			.send({ items: [{ product_id: 7, qty: 10 }, { product_id: 7, qty: 10 }], shipping });
		expect(stock).toBeLessThan(20);
		expect(response.status).toBe(409);
		expect(await stockOf(7)).toBe(stock);
	});

	it("rend le stock quand le client annule une commande en attente", async () => {
		const token = await newClient();
		const before = await stockOf(3);
		const { body } = await api().post("/api/orders").set(bearer(token)).send({ items: [{ product_id: 3, qty: 2 }], shipping });
		expect(await stockOf(3)).toBe(before - 2);

		expect((await api().post(`/api/orders/${body.data.id}/cancel`).set(bearer(token))).status).toBe(200);
		expect(await stockOf(3)).toBe(before);
		// une seconde annulation ne rend pas le stock deux fois
		expect((await api().post(`/api/orders/${body.data.id}/cancel`).set(bearer(token))).status).toBe(409);
		expect(await stockOf(3)).toBe(before);
	});

	it("cache la commande d'un client aux autres clients", async () => {
		const owner = await newClient();
		const { body } = await api().post("/api/orders").set(bearer(owner)).send({ items: [{ product_id: 4, qty: 1 }], shipping });

		await api().post("/api/register").send({ email: "autre@emateriel.test", password: "Motdepasse1" });
		const other = await login({ email: "autre@emateriel.test", password: "Motdepasse1" });
		expect((await api().get(`/api/orders/${body.data.id}`).set(bearer(other))).status).toBe(404);
		expect((await api().post(`/api/orders/${body.data.id}/cancel`).set(bearer(other))).status).toBe(404);
	});

	it("valide l'adresse de livraison", async () => {
		const token = await newClient();
		const response = await api()
			.post("/api/orders")
			.set(bearer(token))
			.send({ items: [{ product_id: 1, qty: 1 }], shipping: { ...shipping, zip: "ABC" } });
		expect(response.status).toBe(400);
	});

	it("permet à l'admin de suivre et d'expédier une commande", async () => {
		const client = await newClient();
		const { body } = await api().post("/api/orders").set(bearer(client)).send({ items: [{ product_id: 5, qty: 1 }], shipping });
		const admin = await login(ADMIN_ACCOUNT);

		const list = await api().get("/api/orders").set(bearer(admin));
		expect(list.body.data.some((o: { id: number }) => o.id === body.data.id)).toBe(true);

		// une commande s'expédie une fois payée
		expect((await api().patch(`/api/orders/${body.data.id}/status`).set(bearer(admin)).send({ status: "payee" })).status).toBe(200);
		const shipped = await api().patch(`/api/orders/${body.data.id}/status`).set(bearer(admin)).send({ status: "expediee" });
		expect(shipped.status).toBe(200);
		const bad = await api().patch(`/api/orders/${body.data.id}/status`).set(bearer(admin)).send({ status: "volee" });
		expect(bad.status).toBe(400);
	});
});

describe("cycle de vie paiement / stock (correctifs relecture sécurité)", () => {
	it("ferme la page Stripe avant d'annuler, pour qu'une commande annulée ne puisse plus être payée", async () => {
		const token = await newClient();
		const { body } = await api().post("/api/orders").set(bearer(token)).send({ items: [{ product_id: 8, qty: 1 }], shipping });
		expect((await api().post(`/api/orders/${body.data.id}/cancel`).set(bearer(token))).status).toBe(200);
		expect(stripeCalls.some((c) => c.url.endsWith("/expire"))).toBe(true);
	});

	it("n'annule jamais une commande déjà payée (et ne rend pas son stock)", async () => {
		const token = await newClient();
		const before = await stockOf(9);
		const { body } = await api().post("/api/orders").set(bearer(token)).send({ items: [{ product_id: 9, qty: 1 }], shipping });

		paymentStatus = "paid"; // payé sur Stripe, mais le client n'est jamais revenu sur le site
		const cancel = await api().post(`/api/orders/${body.data.id}/cancel`).set(bearer(token));
		expect(cancel.status).toBe(409);
		expect((await api().get(`/api/orders/${body.data.id}`).set(bearer(token))).body.data.status).toBe("payee");
		expect(await stockOf(9)).toBe(before - 1);
	});

	it("limite les commandes en attente de paiement par client", async () => {
		const token = await newClient();
		const order = () => api().post("/api/orders").set(bearer(token)).send({ items: [{ product_id: 10, qty: 1 }], shipping });
		expect((await order()).status).toBe(201);
		expect((await order()).status).toBe(201);
		expect((await order()).status).toBe(409);
	});

	it("libère le stock des commandes abandonnées lors du nettoyage", async () => {
		const { default: OrderPaymentService } = await import("../server/service/order_payment_service");
		const token = await newClient();
		const before = await stockOf(11);
		const { body } = await api().post("/api/orders").set(bearer(token)).send({ items: [{ product_id: 11, qty: 2 }], shipping });
		expect(await stockOf(11)).toBe(before - 2);

		// « plus vieilles que -1 minute » = toutes les commandes en attente
		await new OrderPaymentService().sweep(-1);
		expect((await api().get(`/api/orders/${body.data.id}`).set(bearer(token))).body.data.status).toBe("annulee");
		expect(await stockOf(11)).toBe(before);
	});

	it("refuse les changements de statut incohérents", async () => {
		const token = await newClient();
		const { body } = await api().post("/api/orders").set(bearer(token)).send({ items: [{ product_id: 12, qty: 1 }], shipping });
		const admin = await login(ADMIN_ACCOUNT);
		const set = (status: string) => api().patch(`/api/orders/${body.data.id}/status`).set(bearer(admin)).send({ status });

		// en attente → expédiée sans paiement : refusé
		expect((await set("expediee")).status).toBe(409);
		expect((await set("annulee")).status).toBe(200);
		// annulée = définitif (le stock a déjà été rendu)
		expect((await set("payee")).status).toBe(409);
	});
});
