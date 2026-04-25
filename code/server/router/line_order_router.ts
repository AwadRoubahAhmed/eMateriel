import express from "express";
import Line_order_Controller from "../controller/line_order_controller";

class Line_order_router {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/", new Line_order_Controller().index);

		this.router.get("/find", new Line_order_Controller().findByOrderAndProduct);

		this.router.get("/:id", new Line_order_Controller().selectOne);
		this.router.get(
			"/order/:order_id",
			new Line_order_Controller().selectByOrder,
		);
		this.router.post("/", new Line_order_Controller().create);

		this.router.put("/:id/increment", new Line_order_Controller().incrementQty);

		this.router.put("/:id", new Line_order_Controller().update);

		this.router.delete("/:id", new Line_order_Controller().delete);

		return this.router;
	};
}
export default Line_order_router;
