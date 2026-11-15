import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero_shop.webp";
import styles from "./Hero.module.css";

export default function Hero() {
	return (
		<section className={styles.hero}>
			<div className={styles.content}>
				<p className={styles.eyebrow}>Matériel high-tech</p>
				<h1 className={styles.heading}>
					Nouveautés <span className={styles.accent}>Collection 2026</span>
				</h1>
				<p className={styles.lead}>
					Smartphones, tablettes, ordinateurs et accessoires, avec paiement sécurisé et suivi de
					commande en ligne.
				</p>
				{/* l'appel à l'action principal de la page */}
				<Link to="/products" className={styles.cta}>
					Découvrir les produits <FiArrowRight aria-hidden="true" />
				</Link>
			</div>

			<div className={styles.visual}>
				<img
					src={heroImage}
					alt="Ordinateur portable, smartphone et accessoires dans une boutique"
					width="464"
					height="260"
					fetchPriority="high"
				/>
			</div>
		</section>
	);
}
