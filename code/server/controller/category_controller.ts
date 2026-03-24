import type { Request, Response } from "express";
import Category_Repository from "../repository/category_repository";

class Category_Controller {
	//créer une methode a la route / en GET située dans le routeur
	public index = async (_req: Request, res: Response) => {
		//recuperation des resultats de la requete
		const resultat = await new Category_Repository().selectAll();
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
		const resultat = await new Category_Repository().selectOne(req.params);
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

	public create = async (req: Request, res: Response) => {
		const resultat = await new Category_Repository().create(req.body);

		if (resultat instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});
			return;
		}

		res.status(201).json({
			status: 201,
			message: "Category created",
			id: resultat,
		});
	};

	public update = async (req: Request, res: Response) => {
		const id = Number(req.params.id);

		const resultat = await new Category_Repository().update(id, req.body);

		if (resultat instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});
			return;
		}

		if (!resultat) {
			res.status(404).json({
				status: 404,
				message: "Category not found",
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: "Category updated",
		});
	};

	public delete = async (req: Request, res: Response) => {
		const id = Number(req.params.id);

		const resultat = await new Category_Repository().delete(id);

		if (resultat instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});
			return;
		}

		if (!resultat) {
			res.status(404).json({
				status: 404,
				message: "Category not found",
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: "Category deleted",
		});
	};
}

export default Category_Controller;
