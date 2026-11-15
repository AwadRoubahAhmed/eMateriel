// Session de l'utilisateur, gardée dans le navigateur (localStorage).
// shortcut: jeton lisible par le JavaScript de la page ; passer à un cookie httpOnly
// si le site accepte un jour du contenu tiers (scripts externes, HTML saisi par des utilisateurs).

export type SessionUser = {
	id: number;
	email: string;
	firstname?: string | null;
	lastname?: string | null;
	role: { name: string };
};
export type Session = { token: string; user: SessionUser };

const KEY = "ematériel.session";
const listeners = new Set<() => void>();
let cache: Session | null | undefined;

const expired = (token: string) => {
	try {
		const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
		return typeof payload.exp !== "number" || payload.exp * 1000 < Date.now();
	} catch {
		return true;
	}
};

const emit = () => {
	for (const listener of listeners) listener();
};

export const getSession = (): Session | null => {
	if (typeof window === "undefined") return null;
	if (cache === undefined) {
		try {
			cache = JSON.parse(localStorage.getItem(KEY) ?? "null");
		} catch {
			cache = null;
		}
	}
	// jeton expiré : session oubliée (sans notifier, on peut être en plein rendu)
	if (cache && expired(cache.token)) {
		cache = null;
		localStorage.removeItem(KEY);
	}
	return cache ?? null;
};

export const login = (session: Session) => {
	cache = session;
	localStorage.setItem(KEY, JSON.stringify(session));
	emit();
};

export const logout = () => {
	cache = null;
	if (typeof window !== "undefined") localStorage.removeItem(KEY);
	emit();
};

export const subscribe = (listener: () => void) => {
	listeners.add(listener);
	// connexion / déconnexion dans un autre onglet
	const onStorage = (e: StorageEvent) => {
		if (e.key === KEY) {
			cache = undefined;
			listener();
		}
	};
	window.addEventListener("storage", onStorage);
	return () => {
		listeners.delete(listener);
		window.removeEventListener("storage", onStorage);
	};
};

export const isAdmin = (session: Session | null) => session?.user.role.name === "Administrateur";
