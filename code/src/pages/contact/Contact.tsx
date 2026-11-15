import { Link } from "react-router-dom";
import ContactForm from "../../components/contact/ContactForm";
import Seo from "../../components/Seo";
import Title from "../../components/title/Title";
import styles from "./Contact.module.css";

export default function Contact() {
	return (
		<section className={`page ${styles.container}`}>
			<Seo
				title="Contact"
				description="Une question sur un produit ou une commande ? Écrivez à l'équipe eMatériel."
				path="/contact"
			/>
			<Title title="Contactez-nous" as="h1" />
			<p className={styles.subtitle}>Une question sur un produit ou une commande ? Écrivez-nous.</p>

			<div className={styles.grid}>
				<div className={styles.info}>
					<h2>Avant d'écrire</h2>
					<p>
						Pour une commande, indiquez son numéro (visible dans{" "}
						<Link to="/mes-commandes">Mes commandes</Link>).
					</p>
					<p>
						Les réponses aux questions fréquentes sont dans notre <Link to="/faqs">FAQ</Link>.
					</p>
					<p>
						Les coordonnées de l'éditeur figurent dans les{" "}
						<Link to="/mentions-legales">mentions légales</Link>.
					</p>
				</div>
				<ContactForm />
			</div>
		</section>
	);
}
