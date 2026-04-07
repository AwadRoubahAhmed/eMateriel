"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import type { User } from "../../../../models/user";
import SecurityAPiService from "../../../services/api_security_service";
import styles from "./LoginForm.module.css";
import SecurityService from "../../../services/security_service";

type LoginFormProps = {
	onSuccess?: (user: User) => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
	const api = new SecurityAPiService();

	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const res = await api.login(form);

			if (res.status !== 200 || !res.data) {
				throw new Error(res.message);
			}

			const security = new SecurityService();
			security.setToken(res.token);

			onSuccess?.(res.data);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Erreur serveur");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.field}>
				<label htmlFor="email">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					value={form.email}
					onChange={handleChange}
				/>
			</div>

			<div className={styles.field}>
				<label htmlFor="password">Mot de passe</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					value={form.password}
					onChange={handleChange}
				/>
			</div>

			{error && (
				<p className={styles.error} role="alert">
					{error}
				</p>
			)}

			<button type="submit" disabled={loading}>
				{loading ? "Connexion..." : "Se connecter"}
			</button>
		</form>
	);
}
