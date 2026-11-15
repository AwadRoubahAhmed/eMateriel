"use client";

import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import NotFound from "./NotFound";
import styles from "./Error.module.css";

// Affichée quand une page lève une erreur (produit inexistant = 404, panne = 500)
export default function RouteError() {
	const error = useRouteError();
	const notFound = isRouteErrorResponse(error) && error.status === 404;

	return (
		<>
			<Navbar />
			<main id="main-content">
				{notFound ? (
					<NotFound message="Ce produit ou cette page n'existe pas (ou plus)." />
				) : (
					<section className={`page ${styles.section}`}>
						<title>Erreur | eMatériel</title>
						<meta name="robots" content="noindex" />
						<h1>Une erreur est survenue</h1>
						<p className={styles.text}>Merci de réessayer dans quelques instants.</p>
						<Link to="/" className="btn">
							Retour à l'accueil
						</Link>
					</section>
				)}
			</main>
			<Footer />
		</>
	);
}
