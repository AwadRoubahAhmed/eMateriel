import type { Request, Response } from "express";
import type { Product } from "../../models/product";
import Product_Repository from "../repository/product_repository";
import FileService from "../service/file_service";

class Product_Controller {
	public index = async (_req: Request, res: Response) => {
		const resultat = await new Product_Repository().selectAll();
		if (resultat instanceof Error) {
			return res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});
		}
		res.status(200).json({ status: 200, message: "ok", data: resultat });
	};

	public selectOne = async (req: Request, res: Response) => {
		const resultat = await new Product_Repository().selectOne(req.params);
		if (resultat instanceof Error) {
			return res.status(400).json({ status: 400, message: resultat.message });
		}
		if (!resultat) {
			return res
				.status(404)
				.json({ status: 404, message: "Product not found" });
		}
		res.status(200).json({ status: 200, message: "ok", data: resultat });
	};

	public insert = async (req: Request, res: Response) => {
		const file = (req.files as Express.Multer.File[])?.[0];
		const fileService = new FileService();
		const fullname = file ? await fileService.rename(file) : null;

		const resultat = await new Product_Repository().insert({
			...req.body,
			image: fullname,
		});
		if (resultat instanceof Error) {
			return res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});
		}
		res.status(201).json({ status: 201, message: "ok", data: resultat });
	};

	public update = async (req: Request, res: Response) => {
		const file = (req.files as Express.Multer.File[])?.[0];
		const fileService = new FileService();

		let fullname: string | undefined;
		if (file) {
			fullname = await fileService.rename(file);
		} else {
			const existing = (await new Product_Repository().selectOne(
				req.body,
			)) as Product;
			fullname = existing?.image;
		}

		const resultat = await new Product_Repository().update({
			...req.body,
			image: fullname,
		});
		if (resultat instanceof Error) {
			return res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});
		}
		res.status(200).json({ status: 200, message: "Updated", data: resultat });
	};

	public delete = async (req: Request, res: Response) => {
		const resultat = await new Product_Repository().delete({
			id: Number(req.params.id),
		});

		if (resultat instanceof Error) {
			return res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : resultat.message,
			});
		}

		res.status(200).json({ status: 200, message: "Deleted", data: resultat });
	};
}

export default Product_Controller;
