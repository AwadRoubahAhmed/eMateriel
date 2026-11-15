"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styles from "../../pages/contact/Contact.module.css";
import { api, errorMessage } from "../../services/api";

type ContactValues = {
	name: string;
	email: string;
	subject: string;
	message: string;
	website: string; // champ piège anti-robots
};

export default function ContactForm() {
	const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ContactValues>();

	const onSubmit = async (values: ContactValues) => {
		const result = await api("/api/contact", { method: "POST", body: values });
		if (result.status === 201) {
			setFeedback({ ok: true, text: "Message envoyé, merci ! Nous vous répondrons par email." });
			reset();
		} else {
			setFeedback({ ok: false, text: errorMessage(result) });
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
			<div role="status" aria-live="polite">
				{feedback && <p className={`form-message ${feedback.ok ? "success" : "error"}`}>{feedback.text}</p>}
			</div>

			<div className="field">
				<label htmlFor="contact-name">Nom</label>
				<input id="contact-name" autoComplete="name" aria-invalid={!!errors.name} {...register("name", { required: "Nom obligatoire", minLength: { value: 2, message: "Nom trop court" } })} />
				{errors.name && <span className="field-error">{errors.name.message}</span>}
			</div>
			<div className="field">
				<label htmlFor="contact-email">Email</label>
				<input id="contact-email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email", { required: "Email obligatoire", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email invalide" } })} />
				{errors.email && <span className="field-error">{errors.email.message}</span>}
			</div>
			<div className="field">
				<label htmlFor="contact-subject">Sujet</label>
				<input id="contact-subject" aria-invalid={!!errors.subject} {...register("subject", { required: "Sujet obligatoire", minLength: { value: 2, message: "Sujet trop court" } })} />
				{errors.subject && <span className="field-error">{errors.subject.message}</span>}
			</div>
			<div className="field">
				<label htmlFor="contact-message">Message</label>
				<textarea id="contact-message" aria-invalid={!!errors.message} {...register("message", { required: "Message obligatoire", minLength: { value: 10, message: "10 caractères minimum" }, maxLength: { value: 5000, message: "5 000 caractères maximum" } })} />
				{errors.message && <span className="field-error">{errors.message.message}</span>}
			</div>

			{/* invisible pour les humains ; un robot le remplit et son message est ignoré */}
			<div className="hp-field" aria-hidden="true">
				<label htmlFor="contact-website">Ne pas remplir ce champ</label>
				<input id="contact-website" tabIndex={-1} autoComplete="off" {...register("website")} />
			</div>

			<p style={{ fontSize: "0.9rem", color: "var(--muted)", marginBottom: "1rem", lineHeight: 1.5 }}>
				Vos informations servent uniquement à répondre à votre demande.{" "}
				<Link to="/politique-confidentialite" style={{ color: "var(--primary)" }}>
					En savoir plus
				</Link>
			</p>

			<button type="submit" className="btn" disabled={isSubmitting}>
				{isSubmitting ? "Envoi…" : "Envoyer le message"}
			</button>
		</form>
	);
}
