import { IoArrowBackCircleOutline } from "react-icons/io5";
import { data, Link } from "react-router";
import type { Product } from "../../../models/product";
import Product_Repository from "../../../server/repository/product_repository";
import AddToCart from "../../components/product/AddToCart";
import Seo from "../../components/Seo";
import { formatPrice, productImage } from "../../utils/format";
import styles from "./ProductDetail.module.css";

// produit inexistant → vraie erreur 404 (page « introuvable »)
export const loader = async ({ params }: { params: { id?: string } }) => {
	const id = Number(params.id);
	const product = Number.isInteger(id) && id > 0 ? await new Product_Repository().selectOne(id) : null;
	if (!product) throw data("Produit introuvable", { status: 404 });
	return { product };
};

export default function ProductDetail({ loaderData }: { loaderData: { product: Product } }) {
	const { product } = loaderData;
	const description = (product.description ?? "").slice(0, 155);

	return (
		<section className={styles.section}>
			<Seo
				title={product.name}
				description={description || `${product.name} disponible sur eMatériel.`}
				path={`/products/${product.id}`}
				image={productImage(product.image)}
			/>

			<Link to="/products" className={styles.backButton}>
				<IoArrowBackCircleOutline aria-hidden="true" />
				Retour aux produits
			</Link>

			<div className={styles.container}>
				<div className={styles.imageWrapper}>
					<img src={productImage(product.image)} alt={product.name} width="600" height="600" />
				</div>

				<div className={styles.content}>
					<h1 className={styles.title}>{product.name}</h1>
					{product.category && (
						<Link to={`/categories/${product.category.id}`} className={styles.category}>
							{product.category.name}
						</Link>
					)}
					<p className={styles.description}>{product.description}</p>

					<div className={styles.meta}>
						<span className={styles.price}>{formatPrice(product.price)}</span>
						<span className={styles.stock}>
							{product.stock > 0 ? `En stock (${product.stock})` : "Rupture de stock"}
						</span>
					</div>

					<AddToCart
						product={{
							product_id: product.id,
							name: product.name,
							price: product.price,
							image: product.image,
							stock: product.stock,
						}}
					/>
				</div>
			</div>
		</section>
	);
}
