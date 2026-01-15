import type { Request, Response } from "express";
import Product_Repository from "../repository/product_repository";
import FileService from "../service/file_service";
import type { Product } from "../../models/product";

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

	//créer une methode a la route / en GET située dans le routeur
	public insert = async (req: Request, res: Response) => {
		// req.files permet de recupérer les fichiers transférés
		console.log(req.files)
		const file = (req.files as Express.Multer.File[]).shift()as Express.Multer.File;

		// instancier le service de fichier 
		const fileService = new FileService();

		// renommer le fichier transféré et récupérer le nom complet;
		const fullname = await fileService.rename(file)

		console.log(req.body);

		//recuperer ma variable de route
		//recuperation des resultats de la requete
		// req.body : recupere les proprietés body de la requete HTTP en POST
		const resultat = await new Product_Repository().insert({...req.body, image: fullname});
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
		res.status(201).json({
			status: 201,
			message: "ok",
			data: resultat,
		});
	};

	//créer une methode a la route / en PUT => Update située dans le routeur
	public update = async (req: Request, res: Response) => { 
		console.log(req.body);

		// req.files permet de recupérer les fichiers transférés
		console.log(req.files)
		const file = (req.files as Express.Multer.File[]).shift() as Express.Multer.File;
		
		// instancier le service de fichier 
		const fileService = new FileService();

		// renommer le fichier transféré et récupérer le nom complet;
		let fullname

		if (file) {
			fullname = await fileService.rename(file)
		} else {
			fullname = (await new Product_Repository().selectOne(req.body) as Product).image
		}

		console.log(fullname)

		//recuperer ma variable de route
		//recuperation des resultats de la requete
		// req.body : recupere les proprietés body de la requete HTTP en POST
		const resultat = await new Product_Repository().update({...req.body, image: fullname});
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
			message: "Updated",
			data: resultat,
		});
	};

	public delete = async (req: Request, res: Response) => {
		console.log(req.body);

		//recuperer ma variable de route
		//recuperation des resultats de la requete
		// req.body : recupere les proprietés body de la requete HTTP en POST
		const resultat = await new Product_Repository().delete(req.body);
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
			message: "Deleted",
			data: resultat,
		});
	};
}

export default Product_Controller;
