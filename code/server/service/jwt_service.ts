import * as jose from "jose";

export type JwtUser = { id: number; email: string; role: string };

// Le secret ne vit que côté serveur (jamais de préfixe VITE_)
const getSecret = () => {
	const secret = process.env.JWT_SECRET;
	if (!secret || (process.env.NODE_ENV === "production" && secret.length < 32)) {
		throw new Error("JWT_SECRET manquant ou trop court (32 caractères minimum)");
	}
	return new TextEncoder().encode(secret);
};

class JwtService {
	public sign = (user: JwtUser) =>
		new jose.SignJWT(user)
			.setProtectedHeader({ alg: "HS256", typ: "JWT" })
			.setExpirationTime("2h")
			.sign(getSecret());

	// renvoie l'utilisateur si le jeton est valide, sinon null
	public verify = async (token: string | undefined): Promise<JwtUser | null> => {
		if (!token) return null;
		try {
			const { payload } = await jose.jwtVerify(token, getSecret(), {
				algorithms: ["HS256"],
			});
			return payload as unknown as JwtUser;
		} catch {
			return null;
		}
	};
}

export default JwtService;
