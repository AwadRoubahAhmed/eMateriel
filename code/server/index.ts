import path from "node:path";
import { Readable } from "node:stream";
import { pathToFileURL } from "node:url";
import express, { type Request as ExpressRequest, type Response as ExpressResponse } from "express";
import Server from "./core/server";
import OrderPaymentService from "./service/order_payment_service";
import StripeService, { SESSION_TTL_SECONDS } from "./service/stripe_service";

// en production, les liens (Stripe, sitemap, HTTPS) ne doivent jamais dépendre de l'en-tête Host
if (process.env.NODE_ENV === "production" && !process.env.SITE_URL) {
	throw new Error("SITE_URL manquant (ex. https://votre-domaine.fr)");
}

// shortcut: React Router 7.18 écrit encore dans le flux HTML quand le visiteur a fermé
// la page (ERR_INVALID_STATE), ce qui arrêterait tout le serveur ; retirer quand corrigé en amont.
process.on("uncaughtException", (error: NodeJS.ErrnoException) => {
	if (error.code === "ERR_INVALID_STATE") return console.warn("Flux interrompu par le visiteur");
	console.error(error);
	process.exit(1);
});

if (process.env.DB_AUTO_INIT === "true") {
	const { initDatabase } = await import("./service/db_init_service");
	await initDatabase();
}

// Un seul serveur Node : API + site React (pratique pour Hostinger).
const app = new Server().startServer();
const production = process.env.NODE_ENV === "production";

// Requête Express → Request standard (attendue par le rendu React Server Components)
const toFetchRequest = (req: ExpressRequest) => {
	const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
	const headers = new Headers();
	for (const [key, value] of Object.entries(req.headers)) {
		if (value) headers.set(key, Array.isArray(value) ? value.join(", ") : value);
	}
	const hasBody = !["GET", "HEAD"].includes(req.method);
	return new Request(url, {
		method: req.method,
		headers,
		body: hasBody ? (Readable.toWeb(req) as ReadableStream) : undefined,
		// @ts-expect-error duplex requis par Node pour un corps en flux
		duplex: hasBody ? "half" : undefined,
	});
};

const sendFetchResponse = async (response: Response, res: ExpressResponse) => {
	res.status(response.status);
	response.headers.forEach((value, key) => res.append(key, value));
	if (!response.body) return void res.end();
	Readable.fromWeb(response.body as import("node:stream/web").ReadableStream).pipe(res);
};

if (production) {
	const dist = path.resolve("dist");
	app.use(
		"/assets",
		express.static(path.join(dist, "client/assets"), { immutable: true, maxAge: "1y" }),
	);
	app.use(express.static(path.join(dist, "client"), { index: false }));
	const { default: handler } = await import(
		pathToFileURL(path.join(dist, "rsc/index.js")).href
	);
	app.use(async (req, res, next) => {
		try {
			await sendFetchResponse(await handler(toFetchRequest(req)), res);
		} catch (error) {
			next(error);
		}
	});
} else {
	// en développement, Vite (avec rechargement à chaud) sert le site sur le même port
	const { createServer } = await import("vite");
	const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" });
	app.use(vite.middlewares);
}

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
	console.log(`eMatériel : http://localhost:${port}`);
});

// Toutes les 5 minutes : libère le stock des commandes dont la page de paiement a expiré
// (et passe en « payée » celles payées dont le client n'est pas revenu sur le site).
if (new StripeService().isConfigured()) {
	const payments = new OrderPaymentService();
	const staleAfter = Math.ceil(SESSION_TTL_SECONDS / 60) + 2;
	setInterval(() => {
		payments.sweep(staleAfter).catch((error) => console.error("Nettoyage des commandes", error));
	}, 5 * 60_000).unref();
}
