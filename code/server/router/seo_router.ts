import express from "express";
import Category_Repository from "../repository/category_repository";
import Product_Repository from "../repository/product_repository";

// Pages publiques indexables (les pages privées sont exclues et en noindex)
const STATIC_PATHS = [
	"/",
	"/products",
	"/contact",
	"/apropos",
	"/faqs",
	"/mentions-legales",
	"/cgv",
	"/cgu",
	"/politique-confidentialite",
];

const PRIVATE_PATHS = ["/admin", "/auth", "/panier", "/commande", "/mes-commandes", "/api"];

const siteUrl = (req: express.Request) =>
	(process.env.SITE_URL ?? `${req.protocol}://${req.get("host")}`).replace(/\/$/, "");

export const createSeoRouter = () => {
	const router = express.Router();

	router.get("/robots.txt", (req, res) => {
		res.type("text/plain").send(
			[
				"User-agent: *",
				...PRIVATE_PATHS.map((p) => `Disallow: ${p}`),
				"",
				`Sitemap: ${siteUrl(req)}/sitemap.xml`,
				"",
			].join("\n"),
		);
	});

	router.get("/sitemap.xml", async (req, res) => {
		const base = siteUrl(req);
		const [categories, products] = await Promise.all([
			new Category_Repository().selectAll(),
			new Product_Repository().selectAll(),
		]);
		const paths = [
			...STATIC_PATHS,
			...categories.map((c) => `/categories/${c.id}`),
			...products.map((p) => `/products/${p.id}`),
		];
		res.type("application/xml").send(
			`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
				.map((p) => `  <url><loc>${base}${p}</loc></url>`)
				.join("\n")}\n</urlset>\n`,
		);
	});

	return router;
};
