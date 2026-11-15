// Choix cookies du visiteur (recommandations CNIL) : gardé 6 mois, puis redemandé.
export type Consent = { analytics: boolean; date: number };

const KEY = "ematériel.consent";
const SIX_MONTHS = 1000 * 60 * 60 * 24 * 182;
export const OPEN_EVENT = "ematériel:open-cookies";
const listeners = new Set<() => void>();
let cache: Consent | null | undefined;

export const getConsent = (): Consent | null => {
	if (typeof window === "undefined") return null;
	if (cache === undefined) {
		try {
			const stored = JSON.parse(localStorage.getItem(KEY) ?? "null") as Consent | null;
			cache = stored && Date.now() - stored.date < SIX_MONTHS ? stored : null;
		} catch {
			cache = null;
		}
	}
	return cache;
};

export const saveConsent = (analytics: boolean) => {
	cache = { analytics, date: Date.now() };
	localStorage.setItem(KEY, JSON.stringify(cache));
	for (const listener of listeners) listener();
};

export const subscribeConsent = (listener: () => void) => {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
};

// lien « Gérer les cookies » du pied de page
export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_EVENT));
