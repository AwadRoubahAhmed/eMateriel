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

	// 🔥 popup state
	const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
	const [loadingDelete, setLoadingDelete] = useState(false);

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

	const handleDelete = async () => {
		if (confirmDeleteId === null) return;

		const idToDelete = confirmDeleteId; // 🔥 important

		const security = new SecurityService();
		const token = security.getToken();

		if (!token) {
			alert("Non autorisé");
			return;
		}

		setLoadingDelete(true);

		try {
			const res = await new ApiProductService().delete(idToDelete, token);

			console.log("DELETE RESULT:", res);

			if (res.status === 200) {
				setProducts((prev) => prev.filter((p) => p.id !== idToDelete));
			}
		} catch (error) {
			console.log("DELETE ERROR:", error);
		} finally {
			setLoadingDelete(false);
			setConfirmDeleteId(null);
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
				<p>Chargement...</p>
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

								<button
									type="button"
									className={styles.deleteBtn}
									onClick={() => setConfirmDeleteId(product.id)}
								>
									Supprimer
								</button>
							</div>
						</div>
					))}
				</div>
			)}

			{/* POPUP CONFIRM DELETE */}
			{confirmDeleteId && (
				<div className={styles.modalOverlay}>
					<div className={styles.modal}>
						<h3>Confirmer la suppression</h3>
						<p>Voulez-vous supprimer ce produit ?</p>

						<div className={styles.modalActions}>
							<button
								type="button"
								className={styles.cancelBtn}
								onClick={() => setConfirmDeleteId(null)}
								disabled={loadingDelete}
							>
								Annuler
							</button>

							<button
								type="button"
								className={styles.confirmBtn}
								onClick={handleDelete}
								disabled={loadingDelete}
							>
								{loadingDelete ? "Suppression..." : "Confirmer"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminProductHomeContent;
