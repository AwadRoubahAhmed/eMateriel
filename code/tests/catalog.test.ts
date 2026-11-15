import path from "node:path";
import { describe, expect, it } from "vitest";
import { ADMIN_ACCOUNT, api, bearer, login } from "./helpers";

const fixture = path.resolve("tests/storage/images/iphone17proMax.png");

describe("catalogue public", () => {
	it("liste les produits avec leur catégorie", async () => {
		const response = await api().get("/api/product");
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBeGreaterThan(10);
		expect(response.body.data[0].category.name).toBeTruthy();
		expect(typeof response.body.data[0].price).toBe("number");
	});

	it("filtre par catégorie", async () => {
		const response = await api().get("/api/product?category=2");
		expect(response.body.data.every((p: { category_id: number }) => p.category_id === 2)).toBe(true);
	});

	it("renvoie 404 pour un produit inexistant", async () => {
		expect((await api().get("/api/product/99999")).status).toBe(404);
	});
});

describe("gestion du catalogue (admin)", () => {
	it("crée, modifie le stock puis supprime un produit avec image", async () => {
		const token = await login(ADMIN_ACCOUNT);

		const created = await api()
			.post("/api/product")
			.set(bearer(token))
			.field("name", "Produit test")
			.field("price", "19.90")
			.field("description", "Description")
			.field("stock", "3")
			.field("category_id", "1")
			.attach("image", fixture);
		expect(created.status).toBe(201);
		const id = created.body.data.id;

		const stock = await api().patch(`/api/product/${id}/stock`).set(bearer(token)).send({ stock: 7 });
		expect(stock.status).toBe(200);
		const product = await api().get(`/api/product/${id}`);
		expect(product.body.data.stock).toBe(7);
		expect(product.body.data.image).toMatch(/\.png$/);

		const image = await api().get(`/images/${product.body.data.image}`);
		expect(image.status).toBe(200);

		expect((await api().delete(`/api/product/${id}`).set(bearer(token))).status).toBe(200);
		expect((await api().get(`/api/product/${id}`)).status).toBe(404);
	});

	it("refuse un fichier qui n'est pas une image", async () => {
		const token = await login(ADMIN_ACCOUNT);
		const response = await api()
			.post("/api/product")
			.set(bearer(token))
			.field("name", "Faux")
			.field("price", "10")
			.field("stock", "1")
			.field("category_id", "1")
			.attach("image", Buffer.from("<?php echo 1; ?>"), { filename: "shell.png", contentType: "image/png" });
		expect(response.status).toBe(400);
	});

	it("refuse un prix négatif", async () => {
		const token = await login(ADMIN_ACCOUNT);
		const response = await api()
			.post("/api/product")
			.set(bearer(token))
			.field("name", "Négatif")
			.field("price", "-5")
			.field("stock", "1")
			.field("category_id", "1")
			.attach("image", fixture);
		expect(response.status).toBe(400);
	});

	it("crée, modifie et supprime une catégorie", async () => {
		const token = await login(ADMIN_ACCOUNT);
		const created = await api().post("/api/category").set(bearer(token)).send({ name: "Écrans", description: "Moniteurs" });
		expect(created.status).toBe(201);
		const id = created.body.data.id;
		const updated = await api().put(`/api/category/${id}`).set(bearer(token)).send({ name: "Écrans PC", description: "" });
		expect(updated.status).toBe(200);
		expect((await api().get(`/api/category/${id}`)).body.data.name).toBe("Écrans PC");
		expect((await api().delete(`/api/category/${id}`).set(bearer(token))).status).toBe(200);
	});
});

describe("référencement", () => {
	it("sert robots.txt avec les pages privées exclues", async () => {
		const response = await api().get("/robots.txt");
		expect(response.status).toBe(200);
		expect(response.text).toContain("Disallow: /admin");
		expect(response.text).toContain("Sitemap: http://localhost:3000/sitemap.xml");
	});

	it("génère un sitemap avec les produits", async () => {
		const response = await api().get("/sitemap.xml");
		expect(response.status).toBe(200);
		expect(response.text).toContain("<loc>http://localhost:3000/products/1</loc>");
		expect(response.text).not.toContain("/admin");
	});
});

describe("fichiers envoyés", () => {
	it("ne laisse aucun fichier sur le disque quand le formulaire produit est refusé", async () => {
		const fs = await import("node:fs");
		const dir = path.resolve("tests/storage/images");
		const before = fs.readdirSync(dir).length;
		const token = await login(ADMIN_ACCOUNT);
		const response = await api()
			.post("/api/product")
			.set(bearer(token))
			.field("name", "X") // trop court : refusé par la validation
			.field("price", "10")
			.field("stock", "1")
			.field("category_id", "1")
			.attach("image", fixture);
		expect(response.status).toBe(400);
		await new Promise((r) => setTimeout(r, 100));
		expect(fs.readdirSync(dir).length).toBe(before);
	});
});
