import express from "express";
import Notice_Controller from "../controller/notice_controller";

class Notice_router {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/", new Notice_Controller().index);

		return this.router;
	};
}
export default Notice_router;
