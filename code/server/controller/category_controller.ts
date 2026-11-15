import type { Request, Response } from "express";
import Category_Repository from "../repository/category_repository";
import { idParam } from "../validation/schemas";

const notFound = (res: Response) =>
	res.status(404).json({ status: 404, message: "Catégorie introuvable" });

class Category_Controller {
	private repository = new Category_Repository();

	public index = async (_req: Request, res: Response) => {
		res.json({ status: 200, message: "ok", data: await this.repository.selectAll() });
	};

	public selectOne = async (req: Request, res: Response) => {
		const category = await this.repository.selectOne(idParam.parse(req.params.id));
		if (!category) return void notFound(res);
		res.json({ status: 200, message: "ok", data: category });
	};

	public create = async (req: Request, res: Response) => {
		const id = await this.repository.create(req.body);
		res.status(201).json({ status: 201, message: "Catégorie créée", data: { id } });
	};

	public update = async (req: Request, res: Response) => {
		if (!(await this.repository.update(idParam.parse(req.params.id), req.body))) {
			return void notFound(res);
		}
		res.json({ status: 200, message: "Catégorie modifiée" });
	};

	public delete = async (req: Request, res: Response) => {
		if (!(await this.repository.delete(idParam.parse(req.params.id)))) {
			return void notFound(res);
		}
		res.json({ status: 200, message: "Catégorie supprimée" });
	};
}

export default Category_Controller;
