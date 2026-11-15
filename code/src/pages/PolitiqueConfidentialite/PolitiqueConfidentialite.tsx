"use client";

import { Link } from "react-router-dom";
import Seo from "../../components/Seo";
import { LEGAL } from "../../data/legal";
import { openCookieSettings } from "../../services/consent_service";

export default function PolitiqueConfidentialite() {
	return (
		<article className="page legal">
			<Seo title="Politique de confidentialité" description="Comment eMatériel collecte et protège vos données personnelles." path="/politique-confidentialite" />
			<h1>Politique de confidentialité</h1>

			<h2>Responsable du traitement</h2>
			<p>
				{LEGAL.editor}, {LEGAL.address} ({LEGAL.email}). Voir les{" "}
				<Link to="/mentions-legales">mentions légales</Link>.
			</p>

			<h2>Données collectées et finalités</h2>
			<ul>
				<li>
					<strong>Compte client</strong> : email, mot de passe (stocké sous forme chiffrée, jamais en
					clair), nom et prénom facultatifs. Finalité : gestion du compte. Base légale : contrat.
				</li>
				<li>
					<strong>Commandes</strong> : produits achetés, montant, nom, adresse et téléphone de
					livraison. Finalité : traitement, livraison et suivi des commandes, obligations comptables.
					Base légale : contrat et obligation légale.
				</li>
				<li>
					<strong>Paiement</strong> : réalisé par Stripe, qui reçoit directement vos données bancaires.
					Nous ne les voyons ni ne les stockons.
				</li>
				<li>
					<strong>Formulaire de contact</strong> : nom, email, sujet et message. Finalité : répondre à
					votre demande. Base légale : intérêt légitime.
				</li>
				<li>
					<strong>Mesure d'audience</strong> (uniquement si vous l'acceptez) : Cloudflare Web Analytics,
					statistiques anonymes de visite, sans cookie publicitaire. Base légale : consentement.
				</li>
			</ul>

			<h2>Durées de conservation</h2>
			<ul>
				<li>Compte : jusqu'à sa suppression, ou 3 ans après la dernière activité.</li>
				<li>Commandes : 10 ans (obligations comptables).</li>
				<li>Messages de contact : 3 ans maximum.</li>
				<li>Choix cookies : 6 mois, puis la question vous est reposée.</li>
			</ul>

			<h2>Destinataires et sous-traitants</h2>
			<p>
				Vos données ne sont ni vendues ni cédées. Elles sont accessibles à l'équipe eMatériel et à nos
				sous-traitants techniques : {LEGAL.host.name} (hébergement, Union européenne), Stripe
				(paiement) et, si vous l'acceptez, Cloudflare (mesure d'audience).
			</p>

			<h2>Stockage dans votre navigateur</h2>
			<p>
				Le site enregistre dans votre navigateur votre session de connexion, votre panier et vos choix
				de cookies. Ces éléments sont nécessaires au fonctionnement du site et ne demandent pas de
				consentement. La mesure d'audience n'est chargée qu'après votre accord.{" "}
				<button
					type="button"
					onClick={openCookieSettings}
					style={{ background: "none", border: 0, padding: 0, color: "var(--primary)", textDecoration: "underline", font: "inherit", cursor: "pointer" }}
				>
					Modifier mes choix de cookies
				</button>
			</p>

			<h2>Vos droits</h2>
			<p>
				Vous pouvez accéder à vos données, les rectifier, les effacer, en limiter le traitement, vous y
				opposer et demander leur portabilité. Écrivez-nous via le{" "}
				<Link to="/contact">formulaire de contact</Link> ou à {LEGAL.email}. Vous pouvez aussi adresser
				une réclamation à la CNIL (www.cnil.fr).
			</p>

			<h2>Sécurité</h2>
			<p>
				Connexion chiffrée (HTTPS), mots de passe hachés, accès au back-office réservé aux
				administrateurs, limitation des tentatives de connexion.
			</p>

			<p>Dernière mise à jour : {LEGAL.lastUpdate}</p>
		</article>
	);
}
