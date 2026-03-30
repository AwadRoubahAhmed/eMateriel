import argon2 from "argon2";
import type { Request, Response } from "express";
import type { User } from "../../models/user";
import SecurityRepository from "../repository/security_repository";

class SecurityController {
	private securityRepository = new SecurityRepository();

	public register = async (
		req: Request,
		res: Response,
	): Promise<undefined | Response> => {
		// hacher le mot de passe
		const hash = await argon2.hash(req.body.password);

		req.body = { ...req.body, password: hash };

		const results = await this.securityRepository.register(req.body);

		if (results instanceof Error) {
			return res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : results.message,
			});
		}

		return res.status(201).json({
			status: 201,
			message: "Created",
			data: results,
		});
	};

	public login = async (req: Request, res: Response) => {
		// vérifier l'existancee de l'email du utilisateur
		let results = await new SecurityRepository().isEmailUserExists(req.body);

		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : results.message,
			});

			return;
		}

		// si l'email n'existe pas
		if (!results) {
			res.status(403).json({
				status: 403,
				message:
					process.env.NODE_ENV === "production"
						? "Error"
						: "Forbidden = User email not exsits",
			});

			return;
		}
		// récuperer l'utilsateur par son email
		results = await new SecurityRepository().selectOneByEmail(req.body);

		// verifier le mot de pass
		const passwordIsValid = await argon2.verify(
			(results as User).password,
			req.body.password,
		);
		if (!passwordIsValid) {
			res.status(401).json({
				status: 401,
				message:
					process.env.NODE_ENV === "production"
						? "Error"
						: "Unauthorized-Invalid password",
			});
		}

		res.status(200).json({
			status: 200,
			message: "Ok User",
			data: results,
		});
	};
}

export default SecurityController;
