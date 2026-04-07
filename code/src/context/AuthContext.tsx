"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import type { User } from "../../models/user";

type AuthContextType = {
	token: string | null;
	user: User | null;
	login: (token: string, user: User) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
	token: null,
	user: null,
	login: () => {},
	logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);

	const login = (jwt: string, u: User) => {
		setToken(jwt);
		setUser(u);
	};

	const logout = () => {
		setToken(null);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ token, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
