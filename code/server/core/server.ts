import express from "express";
import OrdersRouter from "../router/OrdersRouter";
import ProductsRouter from "../router/ProductsRouter";
import RoleRouter from "../router/RoleRouter";

class Server {
	//properties
	private app = express();
	private router = express.Router();

	//constructor
	constructor() {
		//connect router to application
		this.app.use(this.router);

		//call routers
		this.routerList();
	}
	//methods

	//routr list that conatain all lists
	private routerList = () => {
		this.router.use("/api", new HomepageRouter().getRoutes());
		this.router.use("/api", new MachineRouter().getRoutes());
		this.router.use("/api", new RoleRouter().getRoutes());
		this.router.use("/api", new SensorRouter().getRoutes());
	};
	//start server
	public startServer = () => {
		return this.app;
	};
}
export default Server;
