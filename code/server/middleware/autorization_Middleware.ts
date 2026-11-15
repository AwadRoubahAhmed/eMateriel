import type { NextFunction, Request, Response } from "express";
import User_Repository from "../repository/user_repository";
import JwtService, { type JwtUser } from "../service/jwt_service";

export const ADMIN = "Administrateur";
export const CLIENT = "Client";

// utilisateur connecté, placé par le middleware dans res.locals.user
export const currentUser = (res: Response) => res.locals.user as JwtUser;

class AuthorizationMiddlewere {
	// vérifier le JWT de l'en-tête Authorization et le rôle de l'utilisateur
	public authorize = (roles: string[] = [ADMIN, CLIENT]) => {
		return async (req: Request, res: Response, next: NextFunction) => {
			const token = req.header("authorization")?.split("Bearer ")[1];
			const payload = await new JwtService().verify(token);
			// rôle relu en base : un compte rétrogradé ou supprimé perd ses droits tout de suite
			const account = payload ? await new User_Repository().selectOne(payload.id) : null;

			if (!payload || !account) {
				res.status(401).json({ status: 401, message: "Connexion requise" });
				return;
			}
			const user: JwtUser = { id: account.id, email: account.email, role: account.role.name };
			if (!roles.includes(user.role)) {
				res.status(403).json({ status: 403, message: "Accès refusé" });
				return;
			}
			res.locals.user = user;
			next();
		};
	};
}

export default AuthorizationMiddlewere;
