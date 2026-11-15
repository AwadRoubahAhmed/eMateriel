// Point d'entrée Node.js pour l'hébergeur (Hostinger attend un fichier .js) :
// active TypeScript à la volée (tsx) puis démarre le serveur.
import { register } from "tsx/esm/api";

register();
await import("./server/index.ts");
