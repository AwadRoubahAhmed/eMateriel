"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../../../components/Seo";
import SecurityAPiService from "../../../services/api_security_service";
import styles from "./Register.module.css";

const Register = () => {
	const api = new SecurityAPiService();
	const navigate = useNavigate();

	const [form, setForm] = useState({ email: "", password: "", role_id: 1 });
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await api.register(form);

			if (res.status !== 201) {
				setError(res.message);
				setSuccess("");
				return;
			}

			setSuccess("Inscription réussie ! Redirection...");
			setError("");

			// redirection après 1.5s
			setTimeout(() => navigate("/login"), 1500);
		} catch {
			setError("Erreur serveur");
			setSuccess("");
		}
	};

	return (
		<>
			<Seo
				title="eMatériel - Authentification"
				description="La page d'authentification du site eMatériel."
				url="/register"
			/>

			<div className={styles.container}>
				<form className={styles.card} onSubmit={handleSubmit}>
					<h2>Inscription</h2>

					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						required
					/>

					<label htmlFor="password">Mot de passe</label>
					<input
						type="password"
						name="password"
						value={form.password}
						onChange={handleChange}
						required
					/>

					{error && <p className={styles.error}>{error}</p>}
					{success && <p className={styles.success}>{success}</p>}

					<button type="submit">S’inscrire</button>
				</form>
			</div>
		</>
	);
};

export default Register;
