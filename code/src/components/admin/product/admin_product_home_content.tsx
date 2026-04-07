"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../../../models/product";
import ApiProductService from "../../../services/api_product_service";
import SecurityService from "../../../services/security_service";
import Title from "../../title/Title";
import styles from "./admin.module.css";

const AdminProductHomeContent = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			const res = await new ApiProductService().selectAll();
			if (res.status === 200 && res.data) {
				setProducts(res.data);
			}
			setLoading(false);
		};
		fetchProducts();
	}, []);

	// Comportements
	// const handleDelete = async (id: number) => {
	// 	const security = new SecurityService();
	// 	const token = security.getToken();

	// 	console.log("DELETE token:", token);
	// 	console.log("DELETE id:", id);

	// 	const res = await new ApiProductService().delete(id, token ?? undefined);

	// 	if (res.status === 200) {
	// 		console.log("Produit supprimé ✅");

	// 		// mise à jour du state (SANS reload)
	// 		setProducts((prev) => prev.filter((p) => p.id !== id));
	// 	} else {
	// 		console.error("Erreur delete:", res.message);
	// 	}
	// };

	const handleDelete = async (id: number) => {
		const security = new SecurityService();
		const token = security.getToken();

		if (!token) {
			console.log("Aucun token disponible, veuillez vous connecter !");
			return;
		}

		try {
			const res = await new ApiProductService().delete(id, token);
			console.log("Delete res:", res);

			// Optionnel : retirer le produit de la liste front
			setProducts(products.filter((p) => p.id !== id));
		} catch (error) {
			console.log("Erreur delete:", error);
		}
	};
	return (
		<div className={styles.AdminProductHomeContent}>
			<Title title="Gestion des Produits" />

			<div className={styles.buttons}>
				<Link to="/admin/product/form" className={styles.addBtn}>
					Ajouter
				</Link>
			</div>

			{loading ? (
				<p>Chargement des produits...</p>
			) : (
				<div className={styles.productsGrid}>
					{products.map((product) => (
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
								{/* <Link
									to={`/admin/product/delete/${product.id}`}
									className={styles.deleteBtn}
								>
									Supprimer
								</Link> */}
								<button
									type="button"
									onClick={() => handleDelete(product.id)}
									className={styles.deleteBtn}
								>
									Supprimer
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default AdminProductHomeContent;
