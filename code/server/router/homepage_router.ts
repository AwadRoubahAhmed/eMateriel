import express from "express";
import Homepage_Controller from "../controller/homepage_controller";

class Homepage_router {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/", new Homepage_Controller().index);

		return this.router;
	};
}
export default Homepage_router;
