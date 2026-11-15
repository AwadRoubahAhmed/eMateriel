import type { Request, Response } from "express";
import SecurityRepository from "../repository/security_repository";
import JwtService from "../service/jwt_service";
import { hashPassword, verifyPassword } from "../service/password_service";

// Utilisé quand l'email n'existe pas : même temps de réponse qu'avec un vrai compte
const DUMMY_HASH =
	"scrypt$16384$8$1$VPkEC+IDujrede5gijI8cQ==$bBeejhY6KkCTwh3JLp8gu5YS7v8CrkVw8lhxgcFtuhMZ7Mz2BrjBBECVGL372jHFAIuF1S6NXkO/402lvNGG/w==";

class SecurityController {
	private repository = new SecurityRepository();

	public register = async (req: Request, res: Response) => {
		if (await this.repository.selectOneByEmail(req.body.email)) {
			res.status(409).json({ status: 409, message: "Un compte existe déjà avec cet email" });
			return;
		}
		const password = await hashPassword(req.body.password);
		const id = await this.repository.register({ ...req.body, password });
		res.status(201).json({ status: 201, message: "Compte créé", data: { id } });
	};

	public login = async (req: Request, res: Response) => {
		const user = await this.repository.selectOneByEmail(req.body.email);
		const valid = await verifyPassword(user?.password ?? DUMMY_HASH, req.body.password);

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
