import express from "express";
import RoleRouterController from "../controller/RoleController";

class RoleRouter {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/home", new RoleController().index);
		return this.router;
	};
}
export default RoleRouter;
