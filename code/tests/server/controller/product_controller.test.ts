import * as jose from "jose";
import supertest from "supertest";
import { describe, expect, it } from "vitest";
import type { Product } from "../../../models/product";
import type { User } from "../../../models/user";
import Server from "../../../server/core/server";

describe("product controller test suites", async () => {
	// configuration
	const apiRoute = "/api";
	const route = "/product";

	// admin
	const admin: Partial<User> = {
		id: 1,
		email: "marie.curie@admin.com",
		password:
			"$argon2i$v=19$m=16,t=2,p=1$amYwYWtHSFlIdEVCOUlYeg$lXnnF43UW6BaMb/DamiPZg",
		role_id: 1,
		role: {
			id: 1,
			name: "Administrateur",
		},
	};

	// token JWT pour l'utilisateur admin
	const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);
	const alg = "HS256";

	const token = await new jose.SignJWT(admin as User)
		.setProtectedHeader({ alg })
		.setExpirationTime("10h")
		.sign(secret);

	// Fake data : fausses données pour les testes
	const data: Partial<Product> = {
		id: 1,
		name: `name ${Math.random()}`,
		image: "iphone17proMax.png",
		price: 9.99,
		description: "This is a test product",
		stock: 100,
		category_id: 1,
	};

	// tester le code 201 renvoyé par la réponse
	it("should returns a 201 status code when a record is inserted", async () => {
		// arrange
		const expected = 201;
		const sut = supertest(new Server().startServer());

		// act
		/*
        envoyer  des données dans body :
           -si une image st presente, utiliser la methode field() pour chaque champs et la methode attach pour transferer une image
          -si une image n'est pas presente,utiliser la methode send(),
        */

		const response = await sut
			.post(`${apiRoute}${route}`)
			.auth(token, { type: "bearer" })
			.field("name", data.name as string)
			.attach("image", `${process.env.PUBLIC_DIR}/images/${data.image}`)
			.field("price", data.price as number)
			.field("description", data.description as string)
			.field("stock", data.stock as number)
			.field("category_id", data.category_id as number);

		//.send(data);
		const actual = response.status;

		// assert
		expect(actual).toBe(expected);
	});
});
