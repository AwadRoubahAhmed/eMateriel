import { loadEnv } from "vite";
// @ts-expect-error script JavaScript sans types
import { resetDatabase } from "../scripts/db-reset.mjs";

// base de test propre avant chaque lancement de la suite
export default async function setup() {
	await resetDatabase(loadEnv("test", process.cwd(), ""));
}
