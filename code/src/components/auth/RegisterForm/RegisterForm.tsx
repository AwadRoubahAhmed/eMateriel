"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { api, errorMessage } from "../../../services/api";
import { login, type SessionUser } from "../../../services/security_service";
import PasswordInput from "../PasswordInput";

type RegisterValues = {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	confirm: string;
};

export function RegisterForm({ onSuccess }: { onSuccess: (user: SessionUser) => void }) {
	const [error, setError] = useState("");
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm<RegisterValues>();

	const onSubmit = async ({ confirm: _confirm, ...values }: RegisterValues) => {
		setError("");
		const created = await api("/api/register", { method: "POST", body: values });
		if (created.status !== 201) return setError(errorMessage(created));
		// connexion directe après inscription
		const result = await api<SessionUser>("/api/login", {
			method: "POST",
			body: { email: values.email, password: values.password },
		});
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
				<label htmlFor="register-firstname">Prénom</label>
				<input id="register-firstname" autoComplete="given-name" {...register("firstname", { maxLength: 150 })} />
			</div>
			<div className="field">
				<label htmlFor="register-lastname">Nom</label>
				<input id="register-lastname" autoComplete="family-name" {...register("lastname", { maxLength: 150 })} />
			</div>
			<div className="field">
				<label htmlFor="register-email">Email</label>
				<input
					id="register-email"
					type="email"
					autoComplete="email"
					aria-invalid={!!errors.email}
					{...register("email", {
						required: "Email obligatoire",
						pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email invalide" },
					})}
				/>
				{errors.email && <span className="field-error">{errors.email.message}</span>}
			</div>
			<div className="field">
				<label htmlFor="register-password">Mot de passe</label>
				<PasswordInput
					id="register-password"
					autoComplete="new-password"
					aria-describedby="password-help"
					aria-invalid={!!errors.password}
					{...register("password", {
						required: "Mot de passe obligatoire",
						minLength: { value: 8, message: "8 caractères minimum" },
						validate: (v) => (/[A-Za-z]/.test(v) && /\d/.test(v)) || "Au moins une lettre et un chiffre",
					})}
				/>
				<span id="password-help" style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
					8 caractères minimum, avec au moins une lettre et un chiffre.
				</span>
				{errors.password && <span className="field-error">{errors.password.message}</span>}
			</div>
			<div className="field">
				<label htmlFor="register-confirm">Confirmer le mot de passe</label>
				<PasswordInput
					id="register-confirm"
					autoComplete="new-password"
					aria-invalid={!!errors.confirm}
					{...register("confirm", {
						validate: (v) => v === getValues("password") || "Les mots de passe ne correspondent pas",
					})}
				/>
				{errors.confirm && <span className="field-error">{errors.confirm.message}</span>}
			</div>
			<p style={{ fontSize: "0.9rem", color: "var(--muted)", marginBottom: "1rem", lineHeight: 1.5 }}>
				Vos données servent à gérer votre compte et vos commandes. Voir notre{" "}
				<Link to="/politique-confidentialite" style={{ color: "var(--primary)" }}>
					politique de confidentialité
				</Link>
				.
			</p>
			<button type="submit" className="btn" disabled={isSubmitting} style={{ width: "100%" }}>
				{isSubmitting ? "Création du compte…" : "Créer mon compte"}
			</button>
		</form>
	);
}
