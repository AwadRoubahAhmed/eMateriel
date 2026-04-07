import argon2 from "argon2";
import type { Request, Response } from "express";
import * as jose from "jose"; // pour le JWT
import type { User } from "../../models/user";
import SecurityRepository from "../repository/security_repository";

class SecurityController {
	private securityRepository = new SecurityRepository();

	public register = async (
		req: Request,
		res: Response,
	): Promise<undefined | Response> => {
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
		// Vérifier que l'email existe
		let results = await this.securityRepository.isEmailUserExists(req.body);

		if (results instanceof Error) {
			return res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : results.message,
			});
		}

		if (!results) {
			return res.status(403).json({
				status: 403,
				message:
					process.env.NODE_ENV === "production"
						? "Error"
						: "Forbidden - User email not exists",
			});
		}

		// Récupérer l'utilisateur par son email
		results = await this.securityRepository.selectOneByEmail(req.body);

		// Vérifier le mot de passe
		const passwordIsValid = await argon2.verify(
			(results as User).password,
			req.body.password,
		);

		if (!passwordIsValid) {
			return res.status(401).json({
				status: 401,
				message:
					process.env.NODE_ENV === "production"
						? "Error"
						: "Unauthorized - Invalid password",
			});
		}

		// Générer un JWT
		const secret = new TextEncoder().encode(process.env.VITE_JWT_SECRET);
		const token = await new jose.SignJWT({
			id: (results as User).id,
			email: (results as User).email,
			role: (results as User).role,
		})
			.setProtectedHeader({ alg: "HS256", typ: "JWT" })
			.setExpirationTime("2h")
			.sign(secret);

		// Renvoyer le token avec l'utilisateur
		return res.status(200).json({
			status: 200,
			message: "Ok User",
			data: results,
			token,
		});
	};
}

export default SecurityController;
