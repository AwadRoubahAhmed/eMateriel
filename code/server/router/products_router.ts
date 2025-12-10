import express from "express";
import Product_Controller from "../controller/product_controller";

class Product_router {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/", new Product_Controller().index);
		this.router.get("/:id", new Product_Controller().selectOne);

		return this.router;
	};
}
export default Product_router;
