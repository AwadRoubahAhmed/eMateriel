import { randomBytes, type ScryptOptions, scrypt, timingSafeEqual } from "node:crypto";

// Hachage des mots de passe avec scrypt (inclus dans Node.js, rien à compiler sur l'hébergeur).
// Format stocké : scrypt$N$r$p$sel$hash (base64), pour pouvoir durcir les paramètres plus tard.
const PARAMS = { N: 16384, r: 8, p: 1 };
const KEY_LENGTH = 64;

const derive = (password: string, salt: Buffer, options: ScryptOptions) =>
	new Promise<Buffer>((resolve, reject) =>
		scrypt(password, salt, KEY_LENGTH, { ...options, maxmem: 64 * 1024 * 1024 }, (error, key) =>
			error ? reject(error) : resolve(key),
		),
	);

export const hashPassword = async (password: string) => {
	const salt = randomBytes(16);
	const key = await derive(password, salt, PARAMS);
	return `scrypt$${PARAMS.N}$${PARAMS.r}$${PARAMS.p}$${salt.toString("base64")}$${key.toString("base64")}`;
};

export const verifyPassword = async (stored: string, password: string) => {
	const [algo, N, r, p, salt, hash] = stored.split("$");
	if (algo !== "scrypt" || !hash) return false;
	const expected = Buffer.from(hash, "base64");
	const key = await derive(password, Buffer.from(salt, "base64"), { N: Number(N), r: Number(r), p: Number(p) });
	// comparaison à temps constant
	return key.length === expected.length && timingSafeEqual(key, expected);
};
