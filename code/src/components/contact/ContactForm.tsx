"use client";

import { useState } from "react";
import styles from "../../pages/contact/Contact.module.css";

type FormData = {
	name: string;
	email: string;
	subject: string;
	message: string;
};

export default function ContactForm() {
	const [form, setForm] = useState<FormData>({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const [loading, setLoading] = useState(false);
	const [feedback, setFeedback] = useState<string | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setFeedback(null);

		try {
			await new Promise((res) => setTimeout(res, 1000));

			setFeedback("Message envoyé avec succès");
			setForm({
				name: "",
				email: "",
				subject: "",
				message: "",
			});
		} catch {
			setFeedback("Erreur lors de l'envoi du message");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.field}>
				<label htmlFor="name">Nom</label>
				<input
					id="name"
					name="name"
					value={form.name}
					onChange={handleChange}
					required
				/>
			</div>

			<div className={styles.field}>
				<label htmlFor="email">Email</label>
				<input
					id="email"
					type="email"
					name="email"
					value={form.email}
					onChange={handleChange}
					required
				/>
			</div>

			<div className={styles.field}>
				<label htmlFor="subject">Sujet</label>
				<input
					id="subject"
					name="subject"
					value={form.subject}
					onChange={handleChange}
					required
				/>
			</div>

			<div className={styles.field}>
				<label htmlFor="message">Message</label>
				<textarea
					id="message"
					name="message"
					rows={5}
					value={form.message}
					onChange={handleChange}
					required
				/>
			</div>

			<button type="submit" disabled={loading} className={styles.button}>
				{loading ? "Envoi..." : "Envoyer"}
			</button>

			{feedback && <p className={styles.feedback}>{feedback}</p>}
		</form>
	);
}
