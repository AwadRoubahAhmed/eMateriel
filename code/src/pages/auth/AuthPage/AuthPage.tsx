"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../../../models/user";
import { AuthCard } from "../../../components/auth/AuthCard/AuthCard";
import { LoginForm } from "../../../components/auth/LoginForm/LoginForm";
import { RegisterForm } from "../../../components/auth/RegisterForm/RegisterForm";
import { SwitchMode } from "../../../components/auth/SwitchMode/SwitchMode";
import SecurityService from "../../../services/security_service";
import styles from "./AuthPage.module.css";

export default function AuthPage() {
	const [mode, setMode] = useState<"login" | "register">("login");
	const navigate = useNavigate();

	const handleSuccess = async (user: User) => {

		const security = new SecurityService();

		security.setUser(user);
		await security.setToken(user);

		navigate("/admin/dashboard");
	};

	return (
		<div className={styles.container}>
			<AuthCard title={mode === "login" ? "Connexion" : "Inscription"}>
				{mode === "login" ? (
					<LoginForm onSuccess={handleSuccess} />
				) : (
					<RegisterForm onSuccess={handleSuccess} />
				)}

				<SwitchMode
					mode={mode}
					onSwitch={() => setMode(mode === "login" ? "register" : "login")}
				/>
			</AuthCard>
		</div>
	);
}
