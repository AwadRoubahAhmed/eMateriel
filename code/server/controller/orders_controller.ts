import type { Request, Response } from "express";
import Line_order_Repository from "../repository/line_order_repository";
import Orders_Repository from "../repository/orders_repository";

class Orders_Controller {
	// GET ALL
	public index = async (_req: Request, res: Response) => {
		const resultat = await new Orders_Repository().selectAll();

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
		const resultat = await new Orders_Repository().selectOne({ id });

		if (resultat instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});
			return;
		}

		if (!resultat) {
			res.status(404).json({ status: 404, message: "Order not found" });
			return;
		}

		res.status(200).json({ status: 200, message: "ok", data: resultat });
	};

	// CREATE
	// public create = async (req: Request, res: Response) => {
	// 	const resultat = await new Orders_Repository().create(req.body);

	// 	console.log(req.body);

	// 	if (resultat instanceof Error) {
	// 		res.status(400).json({
	// 			status: 400,
	// 			message:
	// 				process.env.NODE_ENV === "production" ? "Error" : resultat.message,
	// 		});

	// 		return;
	// 	}

	// 	res
	// 		.status(201)
	// 		.json({ status: 201, message: "Order created", data: { id: resultat } });
	// };

	// public create = async (req: Request, res: Response) => {
	// 	const resultat = await new Orders_Repository().create(req.body);

	// 	if (resultat instanceof Error) {
	// 		res.status(400).json({
	// 			status: 400,
	// 			message:
	// 				process.env.NODE_ENV === "production" ? "Error" : resultat.message,
	// 		});
	// 		return;
	// 	}

	// 	// récupère l'order complet
	// 	const order = await new Orders_Repository().selectOne({ id: resultat });

	// 	res.status(201).json({
	// 		status: 201,
	// 		message: "Order created",
	// 		data: order,
	// 	});
	// };

	public create = async (req: Request, res: Response) => {
		try {
			const id = await new Orders_Repository().create(req.body);

			res.status(201).json({
				status: 201,
				message: "Order created",
				data: { id },
			});
		} catch (error: any) {
			res.status(400).json({
				status: 400,
				message: error.message ?? "Error",
			});
		}
	};

	// UPDATE
	public update = async (req: Request, res: Response) => {
		const id = Number(req.params.id);
		const resultat = await new Orders_Repository().update(id, req.body);

		if (resultat instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});
			return;
		}

		if (!resultat) {
			res.status(404).json({ status: 404, message: "Order not found" });
			return;
		}

		res.status(200).json({ status: 200, message: "Order updated" });
	};

	// DELETE
	public delete = async (req: Request, res: Response) => {
		const id = Number(req.params.id);
		const resultat = await new Orders_Repository().delete(id);

		if (resultat instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});
			return;
		}

		if (!resultat) {
			res.status(404).json({ status: 404, message: "Order not found" });
			return;
		}

		res.status(200).json({ status: 200, message: "Order deleted" });
	};

	public findByOrderAndProduct = async (req: Request, res: Response) => {
		const orderId = Number(req.query.orderId);
		const productId = Number(req.query.productId);

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
}

export default Orders_Controller;
