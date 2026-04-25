"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Category } from "../../../../models/category";
import ApiCategoryService from "../../../services/api_category_service";
import Title from "../../title/Title";
import styles from "./adminCategory.module.css";

const AdminCategoryHomeContent = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [_loading, setLoading] = useState(true);
	const [deleteId, setDeleteId] = useState<number | null>(null);
	const [loadingDelete, setLoadingDelete] = useState(false);

	useEffect(() => {
		const fetch = async () => {
			const res = await new ApiCategoryService().selectAll();
			if (res.status === 200 && res.data) setCategories(res.data);
			setLoading(false);
		};
		fetch();
	}, []);

	return (
		<div className={styles.AdminCategoryHomeContent}>
			<Title title="Gestion des catégories" />

			<div className={styles.buttons}>
				<Link to="/admin/category/form" className={styles.addBtn}>
					Ajouter
				</Link>
			</div>

			<div className={styles.categoryList}>
				{categories.map((category) => (
					<div key={category.id} className={styles.categoryCard}>
						<div className={styles.categoryInfo}>
							<h3>{category.name}</h3>
							<p>{category.description}</p>
							<p>Produits: {category.products?.length ?? 0}</p>
						</div>

						<div className={styles.categoryActions}>
							<Link
								to={`/admin/category/update/${category.id}`}
								className={styles.editBtn}
							>
								Modifier
							</Link>

							<button type="button" onClick={() => setDeleteId(category.id)}>
								Supprimer
							</button>
						</div>
					</div>
				))}
			</div>

			{/* ICI LE MODAL (EN DEHORS DU MAP) */}
			{deleteId !== null && (
				<div className={styles.overlay}>
					<div className={styles.modal}>
						<h2 className={styles.modalTitle}>Confirmer la suppression</h2>

						<p>Voulez-vous vraiment supprimer cette catégorie ?</p>

						<div className={styles.modalActions}>
							<button
								type="button"
								onClick={() => setDeleteId(null)}
								className={styles.cancelBtn}
							>
								Annuler
							</button>

							<button
								type="button"
								onClick={async () => {
									if (!deleteId) return;

									setLoadingDelete(true);

									const res = await new ApiCategoryService().delete(deleteId);

									setLoadingDelete(false);
									setDeleteId(null);

									if (res.status === 200) {
										setCategories((prev) =>
											prev.filter((c) => c.id !== deleteId),
										);
									} else {
										alert("Erreur suppression");
									}
								}}
								className="px-4 py-2 bg-red-600 text-white rounded"
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

export default AdminCategoryHomeContent;
