import type { Role } from "./role";

// tel que renvoyé par l'API (jamais de mot de passe)
type User = {
	id: number;
	firstname?: string | null;
	lastname?: string | null;
	email: string;
	telephone?: string | null;
	adresse_livraison?: string | null;
	adresse_facturation?: string | null;
	role_id: number;
	role: Role;
	created_at?: string;
};

export type { User };
