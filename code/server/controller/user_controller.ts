import type { Request, Response } from "express";
import User_Repository from "../repository/user_repository";

class User_Controller {
	public index = async (_req: Request, res: Response) => {
		const resultat = await new User_Repository().selectAll();

		if (resultat instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});

			return;
		}

		res.status(200).json({
			status: 200,
			message: "ok",
			data: resultat,
		});
	};

	public selectOne = async (req: Request, res: Response) => {
		const resultat = await new User_Repository().selectOne(req.params);

		if (resultat instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});

			return;
		}

		res.status(200).json({
			status: 200,
			message: "ok",
			data: resultat,
		});
	};
}

export default User_Controller;
