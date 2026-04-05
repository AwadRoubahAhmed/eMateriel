"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import type { User } from "../../models/user";
import SecurityService from "../services/security_service";

type AuthContextType = {
	userId: number | null;
	user: User | null; // ou type User
	login: (user: User) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
	userId: null,
	user: null,
	login: () => {},
	logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const securityService = new SecurityService();

	useEffect(() => {
		// au chargement du client, récupérer user du SecurityService côté serveur si possible
		const currentUser = securityService.getUser();
		setUser(currentUser);
	}, [securityService]);

	const login = (u: User) => {
		setUser(u);
		securityService.setUser(u);
	};

	const logout = () => {
		setUser(null);
		securityService.logout();
	};

	return (
		<AuthContext.Provider
			value={{ user, userId: user?.id ?? null, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
