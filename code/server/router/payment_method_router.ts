import express from "express";
import Payment_method_Controller from "../controller/payment_method_controller";

class Payment_method_router {
	private router = express.Router();

	public getRoutes = () => {
		//create a get router it will be only accessible in get method
		this.router.get("/", new Payment_method_Controller().index);
		this.router.get("/:id", new Payment_method_Controller().selectOne);

		return this.router;
	};
}
export default Payment_method_router;
