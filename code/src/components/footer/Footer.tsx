"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Category } from "../../../models/category";
import { api } from "../../services/api";
import { openCookieSettings } from "../../services/consent_service";
import styles from "./Footer.module.css";
import FooterColumn from "./FooterColumn";

const LINKS = [
	{ to: "/apropos", label: "À propos" },
	{ to: "/contact", label: "Contact" },
	{ to: "/faqs", label: "FAQ" },
];

const LEGAL = [
	{ to: "/mentions-legales", label: "Mentions légales" },
	{ to: "/cgv", label: "Conditions générales de vente" },
	{ to: "/cgu", label: "Conditions d'utilisation" },
	{ to: "/politique-confidentialite", label: "Politique de confidentialité" },
];

const Footer = () => {
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		api<Category[]>("/api/category").then((result) => setCategories(result.data ?? []));
	}, []);

	return (
		<footer className={styles.footer}>
			<div className={styles.footerMain}>
				<FooterColumn title="eMatériel">
					<p className={styles.textColumn}>
						Smartphones, tablettes, ordinateurs et accessoires, livrés chez vous.
					</p>
				</FooterColumn>

				<FooterColumn title="Liens utiles">
					<ul>
						{LINKS.map(({ to, label }) => (
							<li key={to} className={styles.links}>
								<Link to={to}>{label}</Link>
							</li>
						))}
					</ul>
				</FooterColumn>

				<FooterColumn title="Catégories">
					<ul>
						{categories.map((category) => (
							<li key={category.id} className={styles.links}>
								<Link to={`/categories/${category.id}`}>{category.name}</Link>
							</li>
						))}
					</ul>
				</FooterColumn>

				<FooterColumn title="Informations légales">
					<ul>
						{LEGAL.map(({ to, label }) => (
							<li key={to} className={styles.links}>
								<Link to={to}>{label}</Link>
							</li>
						))}
						<li className={styles.links}>
							<button type="button" className={styles.linkButton} onClick={openCookieSettings}>
								Gérer les cookies
							</button>
						</li>
					</ul>
				</FooterColumn>
			</div>

			<div className={styles.footerBottom}>
				<p>© {new Date().getFullYear()} eMatériel. Tous droits réservés.</p>
			</div>
		</footer>
	);
};

export default Footer;
