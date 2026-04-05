import ProductList from "../../components/product/ProductList";
import Seo from "../../components/Seo";
import styles from "./Products.module.css";

export default function Products() {
	return (
		<>
			<Seo
				title="eMatériel - Products"
				description="La page Products"
				url="/products"
			/>

			<h1 className={styles.productPage}>Nos Produits</h1>
			<ProductList />
		</>
	);
}
