import express from "express";
import rateLimit from "express-rate-limit";
import multer from "multer";
import Category_Controller from "../controller/category_controller";
import ContactController from "../controller/contact_controller";
import Orders_Controller from "../controller/orders_controller";
import Product_Controller from "../controller/product_controller";
import SecurityController from "../controller/security_controller";
import User_Controller from "../controller/user_controller";
import { IMAGES_DIR } from "../core/paths";
import AuthorizationMiddlewere, { ADMIN } from "../middleware/autorization_Middleware";
import {
	categorySchema,
	contactSchema,
	loginSchema,
	orderSchema,
	orderStatusSchema,
	productSchema,
	registerSchema,
	roleSchema,
	stockSchema,
	validate,
} from "../validation/schemas";

// Toutes les routes de l'API, regroupées pour voir d'un coup d'œil qui a accès à quoi.
export const createApiRouter = () => {
	const router = express.Router();
	const auth = new AuthorizationMiddlewere();
	const admin = auth.authorize([ADMIN]);
	const loggedIn = auth.authorize();

	// limites anti-abus (désactivées pendant les tests automatiques)
	const skip = () => process.env.NODE_ENV === "test";
	const authLimiter = rateLimit({ windowMs: 15 * 60_000, limit: 10, skip, standardHeaders: true, legacyHeaders: false, message: { status: 429, message: "Trop de tentatives, réessayez dans 15 minutes" } });
	const contactLimiter = rateLimit({ windowMs: 60 * 60_000, limit: 5, skip, standardHeaders: true, legacyHeaders: false, message: { status: 429, message: "Trop de messages, réessayez plus tard" } });
	// par compte (placé après l'authentification) : freine la création de commandes en rafale
	const orderLimiter = rateLimit({ windowMs: 15 * 60_000, limit: 10, skip, keyGenerator: (_req, res) => `user-${res.locals.user.id}`, standardHeaders: true, legacyHeaders: false, message: { status: 429, message: "Trop de commandes, réessayez plus tard" } });

	// image produit : 5 Mo max, image uniquement (le contenu réel est revérifié ensuite)
	const upload = multer({
		dest: IMAGES_DIR,
		limits: { fileSize: 5 * 1024 * 1024, files: 1 },
		fileFilter: (_req, file, cb) => cb(null, file.mimetype.startsWith("image/")),
	}).single("image");

	router.get("/", (_req, res) => {
		res.json({ status: 200, message: "eMatériel API" });
	});

	const security = new SecurityController();
	router.post("/register", authLimiter, validate(registerSchema), security.register);
	router.post("/login", authLimiter, validate(loginSchema), security.login);

	const categories = new Category_Controller();
	router.get("/category", categories.index);
	router.get("/category/:id", categories.selectOne);
	router.post("/category", admin, validate(categorySchema), categories.create);
	router.put("/category/:id", admin, validate(categorySchema), categories.update);
	router.delete("/category/:id", admin, categories.delete);

	const products = new Product_Controller();
	router.get("/product", products.index);
	router.get("/product/:id", products.selectOne);
	// l'authentification passe AVANT multer : aucun fichier écrit pour un visiteur
	router.post("/product", admin, upload, validate(productSchema), products.insert);
	router.put("/product/:id", admin, upload, validate(productSchema), products.update);
	router.patch("/product/:id/stock", admin, validate(stockSchema), products.updateStock);
	router.delete("/product/:id", admin, products.delete);

	const orders = new Orders_Controller();
	router.get("/orders", admin, orders.index);
	router.get("/orders/mine", loggedIn, orders.mine);
	router.post("/orders", loggedIn, orderLimiter, validate(orderSchema), orders.create);
	router.get("/orders/:id", loggedIn, orders.selectOne);
	router.post("/orders/:id/confirm", loggedIn, orders.confirm);
	router.post("/orders/:id/cancel", loggedIn, orders.cancel);
	router.patch("/orders/:id/status", admin, validate(orderStatusSchema), orders.setStatus);

	const users = new User_Controller();
	router.get("/user", admin, users.index);
	router.get("/user/me", loggedIn, users.me);
	router.patch("/user/:id/role", admin, validate(roleSchema), users.setRole);

	const contacts = new ContactController();
	router.post("/contact", contactLimiter, validate(contactSchema), contacts.insert);
	router.get("/contact", admin, contacts.index);
	router.patch("/contact/:id", admin, contacts.markRead);
	router.delete("/contact/:id", admin, contacts.delete);

	router.use((_req, res) => {
		res.status(404).json({ status: 404, message: "Route inconnue" });
	});

	return router;
};
