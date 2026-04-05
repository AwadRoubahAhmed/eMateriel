import { use } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Seo from "../../components/Seo";
import ApiProductService from "../../services/api_product_service";
import styles from "./ProductDetail.module.css";

type ProductDetailProps = {
	params: {
		id: string;
	};
};

export default function ProductDetail({ params }: ProductDetailProps) {
	const result = use(new ApiProductService().selectOne(Number(params.id)));

	const product = result.data;

	return (
		<>
			<Seo
				title={`eMatériel - ${product?.name}`}
				description="Détail du produit"
				url={`/products/${params.id}`}
			/>

			<section className={styles.section}>
				<Link to={"/products"} className={styles.backButton}>
					<IoArrowBackCircleOutline />
					Back
				</Link>

				<div className={styles.container}>
					{/* IMAGE */}
					<div className={styles.imageWrapper}>
						<img src={`/images/${product?.image}`} alt={product?.name} />
					</div>

					{/* CONTENU */}
					<div className={styles.content}>
						<h1 className={styles.title}>{product?.name}</h1>

						<span className={styles.category}>
							Catégorie : {product?.category?.name ?? "Non renseignée"}
						</span>

						<p className={styles.description}>{product?.description}</p>

						<div className={styles.meta}>
							<span className={styles.price}>{product?.price} €</span>

							{product && (
								<span className={styles.stock}>
									{product.stock > 0
										? `En stock : ${product.stock}`
										: "Rupture de stock"}
								</span>
							)}
						</div>

						<button type="button" className={styles.buyButton}>
							Ajouter au panier
						</button>
					</div>
				</div>
			</section>
		</>
	);
}
