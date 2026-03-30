import supertest from "supertest";
import { describe, expect, it } from "vitest";
import Server from "../../../server/core/server";

describe("homepage controller test suite", () => {
	const apiRoute = "/api/";
	const route = "/";

	// Tester le code 200 renvoyé par la route GET /api/homepage
	it("should return the homepage with a 200 status code", async () => {
		// arrange : organiser les données nécessaires pour le test.
		// Resultat attendu de la route GET /api/homepage
		const expected = 200;
		// sut : system under test
		const sut = supertest(new Server().startServer());

		// act : exécuter la fonction ou le code à tester.
		const reponse = await sut.get(`${apiRoute}${route}`);
		const actual = reponse.status;

		// assert : vérifier que le résultat obtenu correspond au résultat attendu.
		expect(actual).toBe(expected);
	});
});

/////////////////////////////////////////////////////////

// import { describe, expect, it } from "vitest";

// const sum = (a: number, b: number) => a + b;

// // describe permet de regrouper plusieurs tests dans une suite de tests.
// describe("sum test suites", () => {
// 	// it permet de créer un test.
// 	it("should return the sum of two numbers", () => {
// 		// arrange : organiser les données nécessaires pour le test.
// 		const a = 2;
// 		const b = 3;
// Resultat attendu de la somme de a et b
// 		const expected = 5;
// 		const notExpected = 6;

// 		// act : exécuter la fonction ou le code à tester.
// 		// actual est le résultat obtenu en exécutant la fonction à tester.
// 		const actual = sum(a, b);

// 		// assert : vérifier que le résultat obtenu correspond au résultat attendu.
// 		// expect est les résultats attendus.
// 		expect(actual).toBe(expected);
// 		expect(actual).not.toBe(notExpected);
// 	});
// });
