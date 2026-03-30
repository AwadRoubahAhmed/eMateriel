import { describe, expect, it } from "vitest";

const sum = (a: number, b: number) => a + b;

// describe permet de regrouper plusieurs tests dans une suite de tests.
describe("sum test suites", () => {
	// it permet de créer un test.
	it("should return the sum of two numbers", () => {
		// arrange : organiser les données nécessaires pour le test.
		const a = 2;
		const b = 3;
		const expected = 5;
		const notExpected = 6;

		// act : exécuter la fonction ou le code à tester.
		// actual est le résultat obtenu en exécutant la fonction à tester.
		const actual = sum(a, b);

		// assert : vérifier que le résultat obtenu correspond au résultat attendu.
		// expect est les résultats attendus.
		expect(actual).toBe(expected);
		expect(actual).not.toBe(notExpected);
	});
});
