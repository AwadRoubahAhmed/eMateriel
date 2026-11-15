import { Link } from "react-router-dom";
import type { Product } from "../../../models/product";
import { formatPrice, productImage } from "../../utils/format";
import styles from "./ProductListItem.module.css";

export default function ProductListItem({ data }: { data: Product }) {
	return (
		<article className={styles.container}>
			<div className={styles.imageWrapper}>
				<img
					src={productImage(data.image)}
					alt={data.name}
					loading="lazy"
					decoding="async"
					width="300"
					height="300"
				/>
			</div>

			<div className={styles.textWrapper}>
				<h3 className={styles.title}>{data.name}</h3>
				<span className={styles.category}>{data.category?.name ?? "Sans catégorie"}</span>
				<p className={styles.description}>{data.description}</p>

				<div className={styles.meta}>
					<span className={styles.price}>{formatPrice(data.price)}</span>
					<span className={styles.stock}>
						{data.stock > 0 ? "En stock" : "Rupture de stock"}
					</span>
				</div>

				<Link
					to={`/products/${data.id}`}
					className={styles.detailButton}
					aria-label={`Voir le produit ${data.name}`}
				>
					Voir le produit
				</Link>
			</div>
		</article>
	);
}
