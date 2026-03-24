import type { Request, Response } from "express";
import Payment_method_Repository from "../repository/payment_method_repository";

class Payment_method_Controller {
	// GET ALL
	public index = async (_req: Request, res: Response) => {
		const resultat = await new Payment_method_Repository().selectAll();

		if (resultat instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});
			return;
		}

		res.status(200).json({ status: 200, message: "ok", data: resultat });
	};

	// GET ONE
	public selectOne = async (req: Request, res: Response) => {
		const id = Number(req.params.id);
		const resultat = await new Payment_method_Repository().selectOne({ id });

		if (resultat instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});
			return;
		}

		if (!resultat) {
			res
				.status(404)
				.json({ status: 404, message: "Payment method not found" });
			return;
		}

		res.status(200).json({ status: 200, message: "ok", data: resultat });
	};

	// CREATE
	public create = async (req: Request, res: Response) => {
		const resultat = await new Payment_method_Repository().create(req.body);

		if (resultat instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});
			return;
		}

		res
			.status(201)
			.json({ status: 201, message: "Payment method created", id: resultat });
	};

	// UPDATE
	public update = async (req: Request, res: Response) => {
		const id = Number(req.params.id);
		const resultat = await new Payment_method_Repository().update(id, req.body);

		if (resultat instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});
			return;
		}

		if (!resultat) {
			res
				.status(404)
				.json({ status: 404, message: "Payment method not found" });
			return;
		}

		res.status(200).json({ status: 200, message: "Payment method updated" });
	};

	// DELETE
	public delete = async (req: Request, res: Response) => {
		const id = Number(req.params.id);
		const resultat = await new Payment_method_Repository().delete(id);

		if (resultat instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});
			return;
		}

		if (!resultat) {
			res
				.status(404)
				.json({ status: 404, message: "Payment method not found" });
			return;
		}

		res.status(200).json({ status: 200, message: "Payment method deleted" });
	};
}

export default Payment_method_Controller;
