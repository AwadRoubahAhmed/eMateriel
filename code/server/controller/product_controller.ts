import type { Request, Response } from "express";
import Product_Repository from "../repository/product_repository";

class Product_Controller {
	//créer une methode a la route / en GET située dans le routeur
	public index = async (_req: Request, res: Response) => {
		//recuperation des resultats de la requete
		const resultat = await new Product_Repository().selectAll();
		//si la requete renvoie une erreur, c'est ok, mais en prod faut pas
		if (resultat instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});
			//si return est seul comme ceci, il stoppe le lancement
			return;
		}

		//renvoyer une reponse avec un code de statut HTTP et au format JSON
		res.status(200).json({
			status: 200,
			message: "ok",
			data: resultat,
		});
	};

	//créer une methode a la route / en GET située dans le routeur
	public selectOne = async (req: Request, res: Response) => {
		//recuperer ma variable de route
		//recuperation des resultats de la requete
		const resultat = await new Product_Repository().selectOne(req.params);
		//si la requete renvoie une erreur, c'est ok, mais en prod faut pas
		if (resultat instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});
			//si return est seul comme ceci, il stoppe le lancement
			return;
		}

		//renvoyer une reponse avec un code de statut HTTP et au format JSON
		res.status(200).json({
			status: 200,
			message: "ok",
			data: resultat,
		});
	};
}

export default Product_Controller;
