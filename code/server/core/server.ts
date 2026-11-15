import express, { type ErrorRequestHandler, type Express } from "express";
import helmet from "helmet";
import multer from "multer";
import { ZodError } from "zod";
import { createApiRouter } from "../router/api_router";
import { createSeoRouter } from "../router/seo_router";
import { IMAGES_DIR } from "./paths";

export { IMAGES_DIR } from "./paths";

class Server {
	private app: Express = express();

	constructor() {
		const production = process.env.NODE_ENV === "production";

		// nombre de proxys devant l'app (Hostinger : 1 ; +1 si Cloudflare en proxy) : l'IP
		// utilisée par les limiteurs de tentatives doit être celle du visiteur, pas falsifiable
		this.app.set("trust proxy", Number(process.env.TRUST_PROXY ?? 1));
		this.app.disable("x-powered-by");

		// HTTPS forcé en production, vers l'adresse officielle (jamais l'en-tête Host reçu)
		if (production && process.env.FORCE_HTTPS !== "false") {
			const site = (process.env.SITE_URL ?? "").replace(/\/$/, "");
			this.app.use((req, res, next) => {
				if (req.secure) return next();
				res.redirect(301, `${site}${req.originalUrl}`);
			});
		}

		this.app.use(
			helmet({
				// shortcut: 'unsafe-inline' car le rendu React (RSC) injecte des scripts en ligne ;
				// passer à un nonce par requête si on veut durcir la CSP.
				contentSecurityPolicy: production
					? {
							directives: {
								"script-src": ["'self'", "'unsafe-inline'", "https://static.cloudflareinsights.com"],
								"connect-src": ["'self'", "https://cloudflareinsights.com"],
								"img-src": ["'self'", "data:"],
								"form-action": ["'self'", "https://checkout.stripe.com"],
							},
						}
					: false,
				crossOriginEmbedderPolicy: false,
			}),
		);

		this.app.use(express.json({ limit: "100kb" }));

		// images produits (hors du dossier public de Vite : ce sont des données, pas du code)
		this.app.use("/images", express.static(IMAGES_DIR, { maxAge: "7d", fallthrough: false }));

		this.app.use(createSeoRouter());
		this.app.use("/api", createApiRouter());
		this.app.use("/api", this.errorHandler);
	}

	// toute erreur non prévue → 500 sans détail technique côté client
	private errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
		if (error instanceof ZodError) {
			res.status(400).json({ status: 400, message: "Paramètre invalide" });
			return;
		}
		if (error instanceof multer.MulterError) {
			res.status(400).json({ status: 400, message: "Fichier refusé (5 Mo maximum)" });
			return;
		}
		if (error?.type === "entity.parse.failed" || error?.type === "entity.too.large") {
			res.status(400).json({ status: 400, message: "Requête invalide" });
			return;
		}
		console.error(error);
		res.status(500).json({ status: 500, message: "Erreur serveur" });
	};

	public startServer = () => this.app;
}

export default Server;
