import styles from "./ConditionsGenerales.module.css";

const ConditionsGenerales = () => {
	return (
		<div className={styles.container}>
			<h1>Conditions Générales</h1>

			<section>
				<h2>1. Objet</h2>
				<p>
					Les présentes conditions régissent l'utilisation du site Shopcart et
					la vente de produits électroniques.
				</p>
			</section>

			<section>
				<h2>2. Produits</h2>
				<p>Nos produits sont décrits avec la plus grande précision possible.</p>
			</section>

			<section>
				<h2>3. Commandes</h2>
				<p>Toute commande implique l'acceptation des présentes conditions.</p>
			</section>
		</div>
	);
};

export default ConditionsGenerales;
