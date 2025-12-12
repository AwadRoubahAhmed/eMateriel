import express from "express";
import Role_Controller from "../controller/role_controller";

class Role_router {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/", new Role_Controller().index);
		this.router.get("/:id", new Role_Controller().selectOne);

		return this.router;
	};
}
export default Role_router;
