import type { Request, Response } from "express";
import Notice_Repository from "../repository/notice_repository";

class Notice_Controller {
	public index = async (_req: Request, res: Response) => {
		const resultat = await new Notice_Repository().selectAll();

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
		const resultat = await new Notice_Repository().selectOne(req.params);

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
				message: "Notice not found",
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: "ok",
			data: resultat,
		});
	};

	public create = async (req: Request, res: Response) => {
		const resultat = await new Notice_Repository().create(req.body);

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
			message: "Notice created",
			id: resultat,
		});
	};

	public update = async (req: Request, res: Response) => {
		const id = Number(req.params.id);

		const resultat = await new Notice_Repository().update(id, req.body);

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
				message: "Notice not found",
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: "Notice updated",
		});
	};

	public delete = async (req: Request, res: Response) => {
		const id = Number(req.params.id);

		const resultat = await new Notice_Repository().delete(id);

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
				message: "Notice not found",
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: "Notice deleted",
		});
	};
}

export default Notice_Controller;
