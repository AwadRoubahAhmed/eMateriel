import styles from "../../pages/apropos/Apropos.module.css";

export default function AboutIntro() {
	return (
		<div className={styles.intro}>
			<p>
				<span className={styles.special}>eMatériel</span> est une plateforme spécialisée dans la vente de matériel
				électronique de qualité. Nous proposons une large gamme de produits
				adaptés aussi bien aux particuliers qu’aux professionnels.
			</p>

			<p>
				Notre mission est de rendre la technologie accessible à tous en offrant
				des produits fiables, au meilleur prix, avec un service client réactif.
			</p>
		</div>
	);
}
