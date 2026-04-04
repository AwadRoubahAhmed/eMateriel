"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import type { User } from "../../../../models/user";
import SecurityAPiService from "../../../services/api_security_service";
import styles from "./RegisterForm.module.css";

type RegisterFormProps = {
	onSuccess?: (user: User) => void;
};

type RegisterFormState = {
	email: string;
	password: string;
	role_id: number;
};

export function RegisterForm({ onSuccess }: RegisterFormProps) {
	const api = new SecurityAPiService();

	const [form, setForm] = useState<RegisterFormState>({
		email: "",
		password: "",
		role_id: 1,
	});

	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setForm({
			...form,
			[name]: name === "role_id" ? Number(value) : value,
		});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const res = await api.register(form);

			if (res.status !== 201 || !res.data) {
				throw new Error(res.message);
			}

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
					value={form.email}
					onChange={handleChange}
					required
				/>
			</div>

			<div className={styles.field}>
				<label htmlFor="password">Mot de passe</label>
				<input
					id="password"
					name="password"
					type="password"
					value={form.password}
					onChange={handleChange}
					required
				/>
			</div>

			{error && <p className={styles.error}>{error}</p>}

			<button type="submit" disabled={loading}>
				{loading ? "Inscription..." : "S'inscrire"}
			</button>
		</form>
	);
}
