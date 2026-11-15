import { FaUndo } from "react-icons/fa";
import { GrDeliver, GrSecure } from "react-icons/gr";
import { MdOutlineMail } from "react-icons/md";
import styles from "./Delivery.module.css";

// Engagements réellement tenus par le site (pas de promesse non vérifiée)
const ITEMS = [
	{ icon: GrSecure, title: "Paiement sécurisé", text: "Paiement par carte via Stripe, vos données bancaires ne passent pas par nos serveurs." },
	{ icon: GrDeliver, title: "Suivi de commande", text: "Retrouvez l'état de chaque commande dans votre espace « Mes commandes »." },
	{ icon: FaUndo, title: "14 jours pour changer d'avis", text: "Droit de rétractation de 14 jours après réception, voir nos CGV." },
	{ icon: MdOutlineMail, title: "Une question ?", text: "Écrivez-nous via le formulaire de contact, nous vous répondons par email." },
];

export default function Delivery() {
	return (
		<section className={styles.wrapper} aria-label="Nos engagements">
			<div className={styles.grid}>
				{ITEMS.map(({ icon: Icon, title, text }) => (
					<div className={styles.deliveryWrapper} key={title}>
						<div className={styles.card}>
							<Icon size={25} aria-hidden="true" />
							<div>
								<h3 className={styles.title}>{title}</h3>
								<p className={styles.text}>{text}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
