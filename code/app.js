// Point d'entrée Node.js pour l'hébergeur (Hostinger attend un fichier .js) :
// active TypeScript à la volée (tsx) puis démarre le serveur.
// Pas de « await » au niveau du module : LiteSpeed charge ce fichier avec require().
import { register } from "tsx/esm/api";

register();
import("./server/index.ts").catch((error) => {
	console.error(error);
	process.exit(1);
});
