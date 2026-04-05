import styles from "../../pages/apropos/Apropos.module.css";

export default function AboutValues() {
	return (
		<div className={styles.values}>
			<h2>Nos valeurs</h2>

			<div className={styles.cards}>
				<div className={styles.card}>
					<h3>Qualité</h3>
					<p>Nous sélectionnons des produits fiables et durables.</p>
				</div>

				<div className={styles.card}>
					<h3>Innovation</h3>
					<p>Nous suivons les dernières tendances technologiques.</p>
				</div>

				<div className={styles.card}>
					<h3>Service</h3>
					<p>Un support client rapide et efficace.</p>
				</div>
			</div>
		</div>
	);
}
