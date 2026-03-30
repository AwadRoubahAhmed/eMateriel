import express from "express";
import SecurityController from "../controller/security_controller";

class SecurityRouter {
	private router = express.Router();

	public getRoutes = () => {
		this.router.post("/register", new SecurityController().register);
        
		this.router.post("/login", new SecurityController().login);

		return this.router;
	};
}

export default SecurityRouter;
