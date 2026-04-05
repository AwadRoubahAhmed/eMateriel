// import CategorySection from "../components/category/CategorySection";
import Delivery from "../components/delivery/Delivery";
import Hero from "../components/hero/Hero";
import Seo from "../components/Seo";
import styles from "./Homepage.module.css";

export default function Homepage() {
	return (
		<>
			{/* Composant Navbar */}

			<div>
				<Seo
					title="eMatériel - Accueil"
					description="La page d'accueil"
					url="/"
				/>

				{/* Composant Hero */}
				<Hero />

				{/* Contenu de la page d'accueil */}
				<div className={styles.delivery}>
					<Delivery />
				</div>

				{/* Section Catégories */}
				{/* <CategorySection /> */}

				{/* Composant Footer */}
			</div>
		</>
	);
}
