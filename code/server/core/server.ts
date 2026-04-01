import cors from "cors";
import express, { type Express, type Router } from "express";
import Category_router from "../router/category_router";
import Homepage_router from "../router/homepage_router";
import Line_order_router from "../router/line_order_router";
import Notice_router from "../router/notice_router";
import Orders_router from "../router/orders_router";
import Payment_method_router from "../router/payment_method_router";
import Product_router from "../router/products_router";
import Role_router from "../router/role_router";
import SecurityRouter from "../router/security_router";
import User_router from "../router/user_router";

class Server {
	//properties
	// instancier une application Express
	private app: Express = express();
	private router: Router = express.Router();

	//constructor
	constructor() {
		//middlewares
		// parser le corps des requetes HTTP en JSON
		this.app.use(express.json());

		// CORS : autoriser l'accès aux données entre origines (protocole, sous-domaine, port)
		this.app.use(
			cors({
				origin: process.env.ORIGINS?.split(","),
			}),
		);

		//connect router to application
		// lier l'application Express au routeur
		this.app.use(this.router);

		//call routers
		// définir la liste des routeurs
		this.routerList();
	}
	//methods

	//router list that conatain all lists
	// liste des routeurs
	private routerList = () => {
		this.router.use("/api", new Homepage_router().getRoutes());

		this.router.use("/api/category", new Category_router().getRoutes());
		
		this.router.use("/api/product", new Product_router().getRoutes());

		this.router.use("/api/orders", new Orders_router().getRoutes());

		this.router.use(
			"/api/payment_method",
			new Payment_method_router().getRoutes(),
		);
		this.router.use("/api/notice", new Notice_router().getRoutes());

		this.router.use("/api/role", new Role_router().getRoutes());

		this.router.use("/api", new SecurityRouter().getRoutes());

		this.router.use("/api/user", new User_router().getRoutes());

		this.router.use("/api/line_order", new Line_order_router().getRoutes());
	};
	//start server
	public startServer = () => {
		return this.app;
	};
}
export default Server;
