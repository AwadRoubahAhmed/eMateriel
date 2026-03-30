import express from "express";
import multer from "multer";
import Product_Controller from "../controller/product_controller";
import AuthorizationMiddlewere from "../middleware/autorization_Middleware";

class Product_router {
	private router = express.Router();

	private multer = multer({ dest: `${process.env.PUBLIC_DIR}/images` });

	public getRoutes = () => {
		this.router.get("/", new Product_Controller().index);
		this.router.get("/:id", new Product_Controller().selectOne);

		this.router.post(
			"/",
			this.multer.any(),
			new AuthorizationMiddlewere().authorize(["admin"]),
			new Product_Controller().insert,
		);

		this.router.put(
			"/",
			this.multer.any(),
			new AuthorizationMiddlewere().authorize(["admin"]),
			new Product_Controller().update,
		);

		this.router.delete(
			"/",
			new AuthorizationMiddlewere().authorize(["admin"]),
			new Product_Controller().delete,
		);

		return this.router;
	};
}
export default Product_router;
