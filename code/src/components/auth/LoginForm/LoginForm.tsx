"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { api, errorMessage } from "../../../services/api";
import { login, type SessionUser } from "../../../services/security_service";
import PasswordInput from "../PasswordInput";

type LoginValues = { email: string; password: string };

export function LoginForm({ onSuccess }: { onSuccess: (user: SessionUser) => void }) {
	const [error, setError] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginValues>();

	const onSubmit = async (values: LoginValues) => {
		setError("");
		const result = await api<SessionUser>("/api/login", { method: "POST", body: values });
		if (result.status !== 200 || !result.data || !result.token) return setError(errorMessage(result));
		login({ token: result.token, user: result.data });
		onSuccess(result.data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate>
			{error && (
				<p className="form-message error" role="alert">
					{error}
				</p>
			)}
			<div className="field">
				<label htmlFor="login-email">Email</label>
				<input
					id="login-email"
					type="email"
					autoComplete="email"
					aria-invalid={!!errors.email}
					{...register("email", { required: "Email obligatoire" })}
				/>
				{errors.email && <span className="field-error">{errors.email.message}</span>}
			</div>
			<div className="field">
				<label htmlFor="login-password">Mot de passe</label>
				<PasswordInput
					id="login-password"
					autoComplete="current-password"
					aria-invalid={!!errors.password}
					{...register("password", { required: "Mot de passe obligatoire" })}
				/>
				{errors.password && <span className="field-error">{errors.password.message}</span>}
			</div>
			<button type="submit" className="btn" disabled={isSubmitting} style={{ width: "100%" }}>
				{isSubmitting ? "Connexion…" : "Se connecter"}
			</button>
		</form>
	);
}
