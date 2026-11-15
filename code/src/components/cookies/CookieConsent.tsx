"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import {
	getConsent,
	OPEN_EVENT,
	saveConsent,
	subscribeConsent,
} from "../../services/consent_service";
import styles from "./CookieConsent.module.css";

const TOKEN = import.meta.env.VITE_CF_ANALYTICS_TOKEN as string | undefined;

// Mesure d'audience Cloudflare : chargée seulement après accord
const loadAnalytics = () => {
	if (!TOKEN || document.getElementById("cf-analytics")) return;
	const script = document.createElement("script");
	script.id = "cf-analytics";
	script.defer = true;
	script.src = "https://static.cloudflareinsights.com/beacon.min.js";
	script.dataset.cfBeacon = JSON.stringify({ token: TOKEN });
	document.body.appendChild(script);
};

export default function CookieConsent() {
	const consent = useSyncExternalStore(subscribeConsent, getConsent, () => null);
	const ready = useSyncExternalStore(subscribeConsent, () => true, () => false);
	const [reopened, setReopened] = useState(false);

	useEffect(() => {
		const open = () => setReopened(true);
		window.addEventListener(OPEN_EVENT, open);
		return () => window.removeEventListener(OPEN_EVENT, open);
	}, []);

	useEffect(() => {
		if (consent?.analytics) loadAnalytics();
	}, [consent]);

	if (!ready || (consent && !reopened)) return null;

	const choose = (analytics: boolean) => {
		saveConsent(analytics);
		setReopened(false);
		// retrait du consentement : le script déjà chargé disparaît au rechargement
		if (!analytics && document.getElementById("cf-analytics")) window.location.reload();
	};

	return (
		<section className={styles.banner} aria-labelledby="cookie-title" role="dialog" aria-modal="false">
			<h2 id="cookie-title" className={styles.title}>
				Vos choix sur les cookies
			</h2>
			<p className={styles.text}>
				Nous utilisons uniquement les éléments nécessaires au fonctionnement du site
				(connexion, panier). Avec votre accord, nous mesurons aussi l'audience de façon
				anonyme avec Cloudflare Web Analytics. Vous pouvez changer d'avis à tout moment
				via « Gérer les cookies » en bas de page.{" "}
				<Link to="/politique-confidentialite">En savoir plus</Link>
			</p>
			<div className={styles.actions}>
				{/* même taille, même style : refuser est aussi simple qu'accepter */}
				<button type="button" className="btn" onClick={() => choose(false)}>
					Tout refuser
				</button>
				<button type="button" className="btn" onClick={() => choose(true)}>
					Tout accepter
				</button>
			</div>
		</section>
	);
}
