import { use } from "react";
import ApiProductService from "../../services/api_product_service";
import styles from "./ProductList.module.css";
import ProductListItem from "./ProductListItem";

export default function ProductList() {
	const result = use(new ApiProductService().selectAll());

	return (
		<section className={styles.gridContainer} aria-label="Liste des produits">
			{result.data?.map((product) => {
				return <ProductListItem data={product} key={product.id} />;
			})}
		</section>
	);
}
