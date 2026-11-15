import argon2 from "argon2";
import type { Request, Response } from "express";
import JwtService from "../service/jwt_service";
import SecurityRepository from "../repository/security_repository";

// Utilisé quand l'email n'existe pas : même temps de réponse qu'avec un vrai compte
const DUMMY_HASH =
	"$argon2id$v=19$m=65536,t=3,p=4$bFqs/vYRUiR3I6/I4gcUpw$ZSWuaH6dAj0YeXx/5nik4yu0vgNMbfB4uhJP57n1JHY";

class SecurityController {
	private repository = new SecurityRepository();

	public register = async (req: Request, res: Response) => {
		if (await this.repository.selectOneByEmail(req.body.email)) {
			res.status(409).json({ status: 409, message: "Un compte existe déjà avec cet email" });
			return;
		}
		const password = await argon2.hash(req.body.password);
		const id = await this.repository.register({ ...req.body, password });
		res.status(201).json({ status: 201, message: "Compte créé", data: { id } });
	};

	public login = async (req: Request, res: Response) => {
		const user = await this.repository.selectOneByEmail(req.body.email);
		const valid = await argon2.verify(user?.password ?? DUMMY_HASH, req.body.password);

		// message identique que l'email ou le mot de passe soit faux
		if (!user || !valid) {
			res.status(401).json({ status: 401, message: "Email ou mot de passe incorrect" });
			return;
		}

		const token = await new JwtService().sign({
			id: user.id,
			email: user.email,
			role: user.role,
		});
		const { password: _hash, ...publicUser } = user;
		res.status(200).json({
			status: 200,
			message: "Connecté",
			data: { ...publicUser, role: { name: user.role } },
			token,
		});
	};
}

export default SecurityController;
