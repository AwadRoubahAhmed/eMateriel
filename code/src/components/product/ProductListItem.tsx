import type { ProductListItemProps } from "../../models/props/ProductListItemProps";
import styles from "./ProductListItem.module.css";

export default function ProductListItem({ data }: ProductListItemProps) {
	return (
		<article className={styles.container} aria-label={`Produit ${data.name}`}>
			<div className={styles.imageWrapper}>
				<img src={`/images/${data.image}`} alt={data.name} loading="lazy" />
			</div>

			<div className={styles.textWrapper}>
				<h2 className={styles.title}>
					{data.id}: {data.name}
				</h2>

				<span className={styles.category}>
					Catégorie : {data.category?.name ?? "Non renseignée"}
				</span>

				<p className={styles.description}>{data.description}</p>

				<div className={styles.meta}>
					<span className={styles.price}>
						{data.price.toLocaleString("fr-FR", {
							style: "currency",
							currency: "EUR",
						})}
					</span>
					<span className={styles.stock}>
						{data.stock > 0 ? `En stock : ${data.stock}` : "Rupture de stock"}
					</span>
				</div>

				{/* {typeof data.rating === "number" && (
					<div
						className={styles.rating}
						role="img"
						aria-label={`Note : ${data.rating} sur 5`}
					>
						<span>{"★".repeat(Math.floor(data.rating))}</span>
						<span>{"☆".repeat(5 - Math.floor(data.rating))}</span>
					</div>
				)} */}
			</div>
		</article>
	);
}
