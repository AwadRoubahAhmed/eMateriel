import express from "express";
import Category_Controller from "../controller/category_controller";

class Category_router {
	private router = express.Router();

	public getRoutes = () => {
		const controller = new Category_Controller();

		// GET
		this.router.get("/", controller.index);
		this.router.get("/:id", controller.selectOne);

		// POST
		this.router.post("/", controller.create);

		// PUT
		this.router.put("/:id", controller.update);

		// DELETE
		this.router.delete("/:id", controller.delete);

		return this.router;
	};
}

export default Category_router;
