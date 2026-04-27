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

	public selectByOrder = async (req: Request, res: Response) => {
		const order_id = Number(req.params.order_id);

		const resultat = await new Line_order_Repository().selectByOrder(order_id);

		res.status(200).json({
			status: 200,
			data: resultat,
		});
	};

	public create = async (req: Request, res: Response) => {
		const resultat = await new Line_order_Repository().create(req.body);

		console.log("BODY RECEIVED:", req.body);

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

		console.log("DELETE LINE ID =", id);

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

	public findByOrderAndProduct = async (req: Request, res: Response) => {
		const orderId = Number(req.query.orderId);
		const productId = Number(req.query.productId);

		console.log("QUERY RECEIVED =", req.query);

		const result = await new Line_order_Repository().findByOrderAndProduct(
			orderId,
			productId,
		);

		if (result instanceof Error) {
			return res.status(400).json({ status: 400, message: result.message });
		}

		if (!result) {
			return res.status(404).json({ status: 404, message: "Not found" });
		}

		return res.status(200).json({ status: 200, data: result });
	};

	public incrementQty = async (req: Request, res: Response) => {
		const id = Number(req.params.id);
		const { qty, total } = req.body;

		try {
			await new Line_order_Repository().incrementQty(id, qty, total);

			res.status(200).json({
				status: 200,
				message: "updated",
			});
		} catch (error) {
			res.status(400).json({
				status: 400,
				message: "error",
			});
		}
	};
}

export default Line_order_Controller;
