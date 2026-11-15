"use client";

import { type ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { isAdmin } from "../../services/security_service";

// Confort d'affichage uniquement : la vraie protection est faite par l'API (JWT + rôle).
export default function RequireAuth({ children, admin }: { children: ReactNode; admin?: boolean }) {
	const { session, ready } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const allowed = session && (!admin || isAdmin(session));

	useEffect(() => {
		if (ready && !session) {
			navigate(`/auth?next=${encodeURIComponent(location.pathname + location.search)}`, { replace: true });
		} else if (ready && !allowed) {
			navigate("/", { replace: true });
		}
	}, [ready, session, allowed, navigate, location]);

	if (!ready || !allowed) return <p className="page">Chargement…</p>;
	return <>{children}</>;
}
