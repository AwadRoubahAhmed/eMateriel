import type { Request, Response } from "express";

class Homepage_Controller {
	//créer une methode a la route / en GET située dans le routeur
	public index = async (_req: Request, res: Response) => {
		//renvoyer une reponse avec un code de statut HTTP et au format JSON
		res.status(200).json({
			status: 200,
			message: "EMatériel API",
		});
	};
}

export default Homepage_Controller;
