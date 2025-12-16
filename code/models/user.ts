import type { Role } from "./role";

type User = {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	telephone: string;
	adresse_livraison: string;
	adresse_facturation: string;
	role_id: number;
	role: Role;
};

export type { User };
