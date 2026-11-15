import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Product } from "../../../models/product";
import { formatPrice, productImage } from "../../utils/format";
import styles from "./ProductListItem.module.css";

export default function ProductListItem({ data }: { data: Product }) {
	const inStock = data.stock > 0;
	return (
		<article className={styles.card}>
			<div className={styles.media}>
				<img
					src={productImage(data.image)}
					alt=""
					loading="lazy"
					decoding="async"
					width="400"
					height="400"
				/>
				<span className={inStock ? styles.inStock : styles.outOfStock}>
					{inStock ? "En stock" : "Rupture"}
				</span>
			</div>

			<div className={styles.body}>
				{data.category && <span className={styles.category}>{data.category.name}</span>}
				<h3 className={styles.title}>
					{/* le lien couvre toute la carte (voir ::after dans le CSS) */}
					<Link to={`/products/${data.id}`} className={styles.link}>
						{data.name}
					</Link>
				</h3>
				<p className={styles.description}>{data.description}</p>
				<div className={styles.footer}>
					<span className={styles.price}>{formatPrice(data.price)}</span>
					<span className={styles.more} aria-hidden="true">
						Voir <FiArrowRight />
					</span>
				</div>
			</div>
		</article>
	);
}
