import express from "express";
import User_Controller from "../controller/user_controller";

class User_router {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/", new User_Controller().index);

		return this.router;
	};
}
export default User_router;
