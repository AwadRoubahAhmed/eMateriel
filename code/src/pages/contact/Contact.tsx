"use client";

import ContactForm from "../../components/contact/ContactForm";
import ContactInfo from "../../components/contact/ContactInfo";
import Seo from "../../components/Seo";
import Title from "../../components/title/Title";
import styles from "./Contact.module.css";

export default function Contact() {
	return (
		<>
			<Seo
				title="eMatériel - Contact"
				description="Contactez-nous"
				url="/contact"
			/>

			<section className={styles.container}>
				<Title title="Contactez-nous" />

				<p className={styles.subtitle}>
					Une question ? Notre équipe vous répond rapidement.
				</p>

				<div className={styles.grid}>
					<ContactInfo />
					<ContactForm />
				</div>
			</section>
		</>
	);
}
