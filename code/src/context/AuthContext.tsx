"use client";

import { useSyncExternalStore } from "react";
import { getSession, type Session, subscribe } from "../services/security_service";

// Session courante ; null côté serveur et pendant l'hydratation (pas de décalage d'affichage).
// `ready` passe à true une fois la session du navigateur lue.
export const useAuth = (): { session: Session | null; ready: boolean } => {
	const session = useSyncExternalStore(subscribe, getSession, () => null);
	const ready = useSyncExternalStore(
		subscribe,
		() => true,
		() => false,
	);
	return { session, ready };
};
