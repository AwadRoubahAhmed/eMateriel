import fs from "node:fs/promises";
import path from "node:path";
import type { Request, Response } from "express";
import { fileTypeFromFile } from "file-type";
import { IMAGES_DIR } from "../core/paths";
import Product_Repository from "../repository/product_repository";
import { idParam } from "../validation/schemas";

const ALLOWED = ["jpg", "png", "webp"];

// Vérifie le vrai contenu du fichier (pas seulement son extension) puis le renomme
const saveImage = async (file: Express.Multer.File) => {
	const type = await fileTypeFromFile(file.path);
	if (!type || !ALLOWED.includes(type.ext)) {
		await fs.rm(file.path, { force: true });
		return null;
	}
	const name = `${file.filename}.${type.ext}`;
	await fs.rename(file.path, path.join(file.destination, name));
	return name;
};

const notFound = (res: Response) =>
	res.status(404).json({ status: 404, message: "Produit introuvable" });

const badImage = (res: Response) =>
	res.status(400).json({ status: 400, message: "Image invalide (JPEG, PNG ou WebP)" });

class Product_Controller {
	private repository = new Product_Repository();

	public index = async (req: Request, res: Response) => {
		const category = req.query.category ? idParam.parse(req.query.category) : undefined;
		res.json({ status: 200, message: "ok", data: await this.repository.selectAll(category) });
	};

	public selectOne = async (req: Request, res: Response) => {
		const product = await this.repository.selectOne(idParam.parse(req.params.id));
		if (!product) return void notFound(res);
		res.json({ status: 200, message: "ok", data: product });
	};

	public insert = async (req: Request, res: Response) => {
		if (!req.file) {
			res.status(400).json({ status: 400, message: "Image obligatoire" });
			return;
		}
		const image = await saveImage(req.file);
		if (!image) return void badImage(res);
		const id = await this.repository.insert({ ...req.body, image });
		res.status(201).json({ status: 201, message: "Produit créé", data: { id } });
	};

	public update = async (req: Request, res: Response) => {
		const id = idParam.parse(req.params.id);
		const existing = await this.repository.selectOne(id);
		if (!existing) {
			if (req.file) await fs.rm(req.file.path, { force: true });
			return void notFound(res);
		}
		let image = existing.image;
		if (req.file) {
			const saved = await saveImage(req.file);
			if (!saved) return void badImage(res);
			image = saved;
		}
		await this.repository.update(id, { ...req.body, image });
		// ancienne image supprimée si plus aucun produit ne l'utilise
		if (image !== existing.image && !(await this.repository.isImageUsed(existing.image))) {
			await fs.rm(path.join(IMAGES_DIR, path.basename(existing.image)), { force: true });
		}
		res.json({ status: 200, message: "Produit modifié" });
	};

	public updateStock = async (req: Request, res: Response) => {
		if (!(await this.repository.updateStock(idParam.parse(req.params.id), req.body.stock))) {
			return void notFound(res);
		}
		res.json({ status: 200, message: "Stock modifié" });
	};

	public delete = async (req: Request, res: Response) => {
		if (!(await this.repository.delete(idParam.parse(req.params.id)))) {
			return void notFound(res);
		}
		res.json({ status: 200, message: "Produit supprimé" });
	};
}

export default Product_Controller;
