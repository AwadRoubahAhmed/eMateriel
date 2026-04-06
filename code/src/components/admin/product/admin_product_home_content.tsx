import { use } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../../../models/product";
import ApiProductService from "../../../services/api_product_service";
import Title from "../../title/Title";
import styles from "./admin.module.css";

const AdminProductHomeContent = () => {
	const results = use(new ApiProductService().selectAll()).data as Product[];

	return (
		<div className={styles.AdminProductHomeContent}>
			<Title title="Gestion des Produits" />

			<div className={styles.buttons}>
				<Link to="/admin/product/form" className={styles.addBtn}>
					Ajouter
				</Link>
			</div>

			<div className={styles.productsGrid}>
				{results.map((product) => (
					<div key={product.id} className={styles.productCard}>
						<img
							src={`/images/${product.image}`}
							alt={product.name}
							className={styles.productImage}
						/>
						<div className={styles.productInfo}>
							<h3>{product.name}</h3>
							<p>ID: {product.id}</p>
							<p>Prix: {product.price} €</p>
							<p>Stock: {product.stock}</p>
						</div>
						<div className={styles.productActions}>
							<Link
								to={`/admin/product/update/${product.id}`}
								className={styles.editBtn}
							>
								Modifier
							</Link>
							<Link
								to={`/admin/product/delete/${product.id}`}
								className={styles.deleteBtn}
							>
								Supprimer
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AdminProductHomeContent;
