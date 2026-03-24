import type { Request, Response } from "express";
import Line_order_Repository from "../repository/line_order_repository";

class Line_order_Controller {
	public index = async (_req: Request, res: Response) => {
		const resultat = await new Line_order_Repository().selectAll();

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
		const id = Number(req.params.id);

		const resultat = await new Line_order_Repository().selectOne({ id });

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
				message: "Line order not found",
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
		const resultat = await new Line_order_Repository().create(req.body);

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
			message: "Line order created",
			id: resultat,
		});
	};

	public update = async (req: Request, res: Response) => {
		const id = Number(req.params.id);

		const resultat = await new Line_order_Repository().update(id, req.body);

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
				message: "Line order not found",
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: "Line order updated",
		});
	};

	public delete = async (req: Request, res: Response) => {
		const id = Number(req.params.id);

		const resultat = await new Line_order_Repository().delete(id);

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
				message: "Line order not found",
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: "Line order deleted",
		});
	};
}

export default Line_order_Controller;
