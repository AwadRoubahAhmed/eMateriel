import { FiMail, FiPackage, FiRotateCcw, FiShield } from "react-icons/fi";
import styles from "./Delivery.module.css";

// Engagements réellement tenus par le site (pas de promesse non vérifiée)
const ITEMS = [
	{ icon: FiShield, title: "Paiement sécurisé", text: "Par carte via Stripe : vos données bancaires ne passent pas par nos serveurs." },
	{ icon: FiPackage, title: "Suivi de commande", text: "L'état de chaque commande dans votre espace « Mes commandes »." },
	{ icon: FiRotateCcw, title: "14 jours pour changer d'avis", text: "Droit de rétractation après réception, voir nos CGV." },
	{ icon: FiMail, title: "Une question ?", text: "Écrivez-nous via le formulaire de contact." },
];

export default function Delivery() {
	return (
		<section className={styles.wrapper} aria-labelledby="engagements-title">
			<h2 id="engagements-title" className="sr-only">
				Nos engagements
			</h2>
			<ul className={styles.grid}>
				{ITEMS.map(({ icon: Icon, title, text }) => (
					<li className={styles.card} key={title}>
						<span className={styles.icon} aria-hidden="true">
							<Icon />
						</span>
						<div>
							<h3 className={styles.title}>{title}</h3>
							<p className={styles.text}>{text}</p>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
