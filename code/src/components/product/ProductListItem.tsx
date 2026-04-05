import { Link } from "react-router-dom";
import type { ProductListItemProps } from "../../models/props/ProductListItemProps";
import styles from "./ProductListItem.module.css";

export default function ProductListItem({ data }: ProductListItemProps) {
	return (
		<article className={styles.container} aria-label={`Produit ${data.name}`}>
			{/* IMAGE EN HAUT */}
			<div className={styles.imageWrapper}>
				<img src={`/images/${data.image}`} alt={data.name} loading="lazy" />
			</div>

			{/* CONTENU AU MILIEU */}
			<div className={styles.textWrapper}>
				<h2 className={styles.title}>{data.name}</h2>

				<span className={styles.category}>
					Catégorie : {data.category?.name ?? "Non renseignée"}
				</span>

				<p className={styles.description}>{data.description}</p>

				<div className={styles.meta}>
					<span className={styles.price}>{data.price} €</span>
					<span className={styles.stock}>
						{data.stock > 0 ? `En stock : ${data.stock}` : "Rupture de stock"}
					</span>
				</div>

				<Link to={`/products/${data.id}`} className={styles.detailButton}>
					Voir les détails
				</Link>
			</div>
		</article>
	);
}
