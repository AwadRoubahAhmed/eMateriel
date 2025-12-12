import express from "express";
import Orders_Controller from "../controller/orders_controller";

class Orders_router {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/", new Orders_Controller().index);
		this.router.get("/:id", new Orders_Controller().selectOne);

		return this.router;
	};
}
export default Orders_router;
