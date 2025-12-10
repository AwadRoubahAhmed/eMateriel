import express from "express";
import Category_Controller from "../controller/category_controller";

class Category_router {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/", new Category_Controller().index);
		this.router.get("/:id", new Category_Controller().selectOne);

		return this.router;
	};
}
export default Category_router;
