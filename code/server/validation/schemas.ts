import fs from "node:fs/promises";
import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

// Schémas de validation partagés côté serveur (le client a aussi les siens)

const email = z.string().trim().toLowerCase().email("Email invalide").max(150);

export const passwordSchema = z
	.string()
	.min(8, "8 caractères minimum")
	.max(100)
	.regex(/[A-Za-z]/, "Au moins une lettre")
	.regex(/[0-9]/, "Au moins un chiffre");

export const registerSchema = z.object({
	email,
	password: passwordSchema,
	firstname: z.string().trim().max(150).optional(),
	lastname: z.string().trim().max(150).optional(),
});

export const loginSchema = z.object({
	email,
	password: z.string().min(1).max(100),
});

export const categorySchema = z.object({
	name: z.string().trim().min(2).max(50),
	description: z.string().trim().max(2000).default(""),
});

// multipart : les nombres arrivent en texte → coerce
export const productSchema = z.object({
	name: z.string().trim().min(2).max(100),
	price: z.coerce.number().positive().max(100000),
	description: z.string().trim().max(5000).default(""),
	stock: z.coerce.number().int().min(0).max(100000),
	category_id: z.coerce.number().int().positive(),
});

export const stockSchema = z.object({
	stock: z.coerce.number().int().min(0).max(100000),
});

export const orderSchema = z.object({
	items: z
		.array(
			z.object({
				product_id: z.number().int().positive(),
				qty: z.number().int().min(1).max(20),
			}),
		)
		.min(1, "Panier vide")
		.max(50),
	shipping: z.object({
		name: z.string().trim().min(2).max(150),
		address: z.string().trim().min(5).max(255),
		zip: z.string().trim().regex(/^\d{5}$/, "Code postal à 5 chiffres"),
		city: z.string().trim().min(2).max(100),
		phone: z
			.string()
			.trim()
			.regex(/^(\+33|0)[1-9](\s?\d{2}){4}$/, "Téléphone invalide"),
	}),
});

export const ORDER_STATUSES = [
	"en_attente",
	"payee",
	"expediee",
	"livree",
	"annulee",
] as const;

export const orderStatusSchema = z.object({ status: z.enum(ORDER_STATUSES) });

export const roleSchema = z.object({ role_id: z.coerce.number().int().min(1).max(2) });

export const contactSchema = z.object({
	name: z.string().trim().min(2).max(100),
	email,
	subject: z.string().trim().min(2).max(150),
	message: z.string().trim().min(10).max(5000),
	// champ piège : invisible pour un humain, rempli par les robots
	website: z.string().max(500).optional(),
});

export const idParam = z.coerce.number().int().positive();

// middleware : remplace req.body par la version validée, ou répond 400
export const validate =
	(schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req.body);
		if (!result.success) {
			// fichier déjà écrit par multer : on ne le garde pas si la requête est refusée
			if (req.file) void fs.rm(req.file.path, { force: true });
			res.status(400).json({
				status: 400,
				message: "Données invalides",
				errors: result.error.issues.map((i) => ({
					field: i.path.join("."),
					message: i.message,
				})),
			});
			return;
		}
		req.body = result.data;
		next();
	};
