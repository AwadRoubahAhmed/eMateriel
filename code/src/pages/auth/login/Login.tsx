"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../../../components/Seo";
import SecurityAPiService from "../../../services/api_security_service";
import SecurityService from "../../../services/security_service";
import styles from "./Login.module.css";

const Login = () => {
	const api = new SecurityAPiService();
	const navigate = useNavigate();

	const [form, setForm] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await api.login(form);

			if (res.status !== 200 || !res.data) {
				setError(res.message);
				return;
			}

			const { user } = res.data;

			new SecurityService().setUser(user);
			await new SecurityService().setToken(user);
			console.log(new SecurityService().getToken());

			setError("");

			// redirection vers dashboard
			navigate("/dashboard");
		} catch {
			setError("Erreur serveur");
		}
	};

	return (
		<>
			<Seo
				title="eMatériel - Authentification"
				description="La page d'authentification du site eMatériel."
				url="/login"
			/>

			<div className={styles.container}>
				<form className={styles.card} onSubmit={handleSubmit}>
					<h2>Connexion</h2>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						value={form.email}
						onChange={handleChange}
						required
					/>
					<label htmlFor="password">Mot de passe</label>
					<input
						type="password"
						name="password"
						id="password"
						value={form.password}
						onChange={handleChange}
						required
					/>
					{error && <p className={styles.error}>{error}</p>}
					<button type="submit" aria-label="Accéder a la page de connexion">Se connecter</button>
				</form>
			</div>
		</>
	);
};

export default Login;
