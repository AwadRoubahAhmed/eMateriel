import type { Product } from "../../../models/product";
import styles from "./ProductList.module.css";
import ProductListItem from "./ProductListItem";

export default function ProductList({ products }: { products: Product[] }) {
	if (products.length === 0) return <p>Aucun produit pour le moment.</p>;
	return (
		<div className={styles.gridContainer}>
			{products.map((product) => (
				<ProductListItem data={product} key={product.id} />
			))}
		</div>
	);
}
