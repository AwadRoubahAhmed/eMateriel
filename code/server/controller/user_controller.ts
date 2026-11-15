import type { Request, Response } from "express";
import { currentUser } from "../middleware/autorization_Middleware";
import User_Repository from "../repository/user_repository";
import { idParam } from "../validation/schemas";

class User_Controller {
	private repository = new User_Repository();

	public index = async (_req: Request, res: Response) => {
		res.json({ status: 200, message: "ok", data: await this.repository.selectAll() });
	};

	public me = async (_req: Request, res: Response) => {
		res.json({ status: 200, message: "ok", data: await this.repository.selectOne(currentUser(res).id) });
	};

	public setRole = async (req: Request, res: Response) => {
		const id = idParam.parse(req.params.id);
		// éviter qu'un admin se retire lui-même ses droits (et bloque le back-office)
		if (id === currentUser(res).id) {
			res.status(409).json({ status: 409, message: "Vous ne pouvez pas changer votre propre rôle" });
			return;
		}
		if (!(await this.repository.updateRole(id, req.body.role_id))) {
			res.status(404).json({ status: 404, message: "Utilisateur introuvable" });
			return;
		}
		res.json({ status: 200, message: "Rôle modifié" });
	};
}

export default User_Controller;
