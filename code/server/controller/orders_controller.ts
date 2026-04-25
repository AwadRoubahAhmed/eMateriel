import type { Request, Response } from "express";
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

	public getUserCart = async (req: Request, res: Response) => {
		const user_id = Number(req.params.user_id);

		const order = await new Orders_Repository().getOrCreateCart(user_id);

		if (order instanceof Error) {
			return res.status(400).json({
				status: 400,
				message: order.message,
			});
		}

		return res.status(200).json({
			status: 200,
			data: order,
		});
	};
}

export default Orders_Controller;
