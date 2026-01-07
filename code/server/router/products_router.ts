import express from "express";
import multer from "multer";
import Product_Controller from "../controller/product_controller";

class Product_router {
	private router = express.Router();

	// multer permet de gérer le transfert de fichiers;
	private multer = multer({ dest: "public" });

	public getRoutes = () => {
		//create a GET router it will be only accessible in get method
		this.router.get("/", new Product_Controller().index);
		this.router.get("/:id", new Product_Controller().selectOne);

		// Route en POST pour inserer un enregistrement
		// utiliser multer pour gerer et transferer les fichiers envoyés
		this.router.post("/", this.multer.any(), new Product_Controller().insert);

		// Route en PUT pour modifier un enregistrement
		// utiliser multer pour gerer les fichiers envoyés
		this.router.put("/", this.multer.any(), new Product_Controller().update);

		// Route en DELETE pour modifier un enregistrement
		// utiliser multer pour gerer et transferer les fichiers envoyés
		this.router.delete("/", new Product_Controller().delete);

		return this.router;
	};
} 
export default Product_router;
