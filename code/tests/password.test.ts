import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "../server/service/password_service";

describe("hachage des mots de passe (scrypt)", () => {
	it("vérifie le bon mot de passe et refuse les autres", async () => {
		const hash = await hashPassword("Motdepasse1");
		expect(hash.startsWith("scrypt$")).toBe(true);
		expect(hash).not.toContain("Motdepasse1");
		expect(await verifyPassword(hash, "Motdepasse1")).toBe(true);
		expect(await verifyPassword(hash, "motdepasse1")).toBe(false);
	});

	it("produit un hachage différent à chaque fois (sel aléatoire)", async () => {
		expect(await hashPassword("Motdepasse1")).not.toBe(await hashPassword("Motdepasse1"));
	});

	it("refuse un hachage illisible sans planter", async () => {
		expect(await verifyPassword("n'importe quoi", "Motdepasse1")).toBe(false);
	});
});
