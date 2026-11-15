import type { Request, Response } from "express";
import ContactRepository from "../repository/contact_repository";
import { idParam } from "../validation/schemas";

class ContactController {
	private repository = new ContactRepository();

	public index = async (_req: Request, res: Response) => {
		res.json({ status: 200, message: "ok", data: await this.repository.selectAll() });
	};

	public insert = async (req: Request, res: Response) => {
		const { website, ...message } = req.body;
		// champ piège rempli = robot : on fait semblant d'accepter, sans rien enregistrer
		if (!website) await this.repository.insert(message);
		res.status(201).json({ status: 201, message: "Message envoyé" });
	};

	public markRead = async (req: Request, res: Response) => {
		const ok = await this.repository.markRead(idParam.parse(req.params.id), req.body.is_read !== false);
		if (!ok) return void res.status(404).json({ status: 404, message: "Message introuvable" });
		res.json({ status: 200, message: "Message mis à jour" });
	};

	public delete = async (req: Request, res: Response) => {
		if (!(await this.repository.delete(idParam.parse(req.params.id)))) {
			return void res.status(404).json({ status: 404, message: "Message introuvable" });
		}
		res.json({ status: 200, message: "Message supprimé" });
	};
}

export default ContactController;
