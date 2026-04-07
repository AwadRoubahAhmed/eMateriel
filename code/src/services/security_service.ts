// import { SignJWT } from "jose";
import type { User } from "../../models/user";

class SecurityService {
	//stocker l'utilisateur
	private static user: User | null = null;

	//STocker le JWT token
	private static token: string | null = null;

	//deconnexion
	public logout = () => {
		//supprimer l'utilisateur
		SecurityService.user = null;
		//supprimer le token
		SecurityService.token = null;
	};

	//getter/setter(accesseur/mutateur)
	public getUser = (): User | null => {
		"use server";
		return SecurityService.user;
	};

	public setUser = (value: User | null) => {
		"use server";
		SecurityService.user = value;
	};

	// public setToken = async (user: User | null) => {
	// 	console.log(import.meta);

	// 	const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);
	// 	const alg = "HS256";
	// 	if (user) {
	// 		SecurityService.token = await new SignJWT(user as User)
	// 			.setProtectedHeader({ alg })
	// 			//durée de validité du token
	// 			.setExpirationTime("10h")
	// 			.sign(secret);
	// 	}
	// };

	//STOCKER le token (et non le générer)
	public setToken = (token: string | null) => {
		SecurityService.token = token;
	};

	public getToken = (): string | null => SecurityService.token;
}

export default SecurityService;
