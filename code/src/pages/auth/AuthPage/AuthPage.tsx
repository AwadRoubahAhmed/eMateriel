"use client";

import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthCard } from "../../../components/auth/AuthCard/AuthCard";
import { LoginForm } from "../../../components/auth/LoginForm/LoginForm";
import { RegisterForm } from "../../../components/auth/RegisterForm/RegisterForm";
import { SwitchMode } from "../../../components/auth/SwitchMode/SwitchMode";
import Seo from "../../../components/Seo";
import type { SessionUser } from "../../../services/security_service";
import styles from "./AuthPage.module.css";

// N'accepte qu'une adresse de ce site : « /\evil.com » ou « /%09/evil.com » seraient
// interprétées par le navigateur comme un autre site (redirection piégée après connexion).
const safeNext = (next: string | null) => {
	if (!next) return null;
	try {
		const url = new URL(next, window.location.origin);
		return url.origin === window.location.origin ? url.pathname + url.search + url.hash : null;
	} catch {
		return null;
	}
};

export default function AuthPage() {
	const [params, setParams] = useSearchParams();
	const navigate = useNavigate();
	const mode = params.get("mode") === "register" ? "register" : "login";
	const next = params.get("next");

	// retour à la page demandée, sinon selon le rôle
	const handleSuccess = (user: SessionUser) => {
		const target = safeNext(next);
		if (target) return navigate(target);
		navigate(user.role.name === "Administrateur" ? "/admin" : "/mes-commandes");
	};

	const switchMode = () => {
		const nextParams = new URLSearchParams(params);
		if (mode === "login") nextParams.set("mode", "register");
		else nextParams.delete("mode");
		setParams(nextParams, { replace: true });
	};

	return (
		<div className={styles.container}>
			<Seo
				title={mode === "login" ? "Connexion" : "Créer un compte"}
				description="Connectez-vous à votre compte eMatériel."
				path="/auth"
				noindex
			/>
			<AuthCard title={mode === "login" ? "Connexion" : "Créer un compte"}>
				{mode === "login" ? (
					<LoginForm onSuccess={handleSuccess} />
				) : (
					<RegisterForm onSuccess={handleSuccess} />
				)}
				<SwitchMode mode={mode} onSwitch={switchMode} />
			</AuthCard>
		</div>
	);
}
