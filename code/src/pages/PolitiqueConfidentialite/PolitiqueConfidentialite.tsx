import styles from "./PolitiqueConfidentialite.module.css";

const PolitiqueConfidentialite = () => {
	return (
		<div className={styles.container}>
			<h1>Politique de Confidentialité</h1>

			<section>
				<h2>1. Données collectées</h2>
				<p>
					Nous collectons certaines données pour améliorer votre expérience.
				</p>
			</section>

			<section>
				<h2>2. Utilisation</h2>
				<p>Les données sont utilisées uniquement dans le cadre du service.</p>
			</section>

			<section>
				<h2>3. Sécurité</h2>
				<p>Nous mettons en œuvre des mesures de sécurité appropriées.</p>
			</section>
		</div>
	);
};

export default PolitiqueConfidentialite;
