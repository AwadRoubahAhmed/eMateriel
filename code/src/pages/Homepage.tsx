import Product_Repository from "../../server/repository/product_repository";
import CategorySection from "../components/category/CategorySection";
import Delivery from "../components/delivery/Delivery";
import Hero from "../components/hero/Hero";
import ProductList from "../components/product/ProductList";
import Seo from "../components/Seo";
import Title from "../components/title/Title";
import styles from "./Homepage.module.css";

export default async function Homepage() {
	// une sélection : le catalogue complet est sur /products
	const products = (await new Product_Repository().selectAll()).slice(0, 8);
	return (
		<>
			<Seo
				title="eMatériel"
				description="eMatériel, boutique en ligne de smartphones, tablettes, ordinateurs et accessoires. Paiement sécurisé et suivi de commande."
				path="/"
			/>
			<Hero />
			<div className={styles.delivery}>
				<Delivery />
			</div>
			<CategorySection />
			<section aria-labelledby="selection-title">
				<Title title="Notre sélection" id="selection-title" />
				<ProductList products={products} />
			</section>
		</>
	);
}
