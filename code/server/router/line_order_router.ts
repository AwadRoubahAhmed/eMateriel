import express from "express";
import Line_order_Controller from "../controller/line_order_controller";

class Line_order_router {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/", new Line_order_Controller().index);
		this.router.get("/:id", new Line_order_Controller().selectOne);

		return this.router;
	};
}
export default Line_order_router;
