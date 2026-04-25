import { use, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../../../../models/product";
import ApiProductService from "../../../services/api_product_service";
import SecurityService from "../../../services/security_service";
import styles from "../admin.module.css";

export default function Delete() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [deleteId, setDeleteId] = useState<number | null>(
		id ? Number(id) : null,
	);
	const [_loadingDelete, setLoadingDelete] = useState(false);
	const [_products, setProducts] = useState<Product[]>([]);

	const product = use(new ApiProductService().selectOne(Number(id)));

	const handleDelete = async () => {
		if (!deleteId) return;

		const security = new SecurityService();
		const token = security.getToken();

		if (!token) {
			alert("Non autorisé");
			return;
		}

		setLoadingDelete(true);

		try {
			const res = await new ApiProductService().delete(deleteId, token);

			if (res.status === 200) {
				setProducts((prev) => prev.filter((p) => p.id !== deleteId));
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoadingDelete(false);
			setDeleteId(null);
		}
	};

	return (
		<div className={styles.AdminProductDelete}>
			<h2>Supprimer produit</h2>

			{product?.data && (
				<p>
					Produit : <strong>{product.data.name}</strong>
				</p>
			)}

			<button type="button" onClick={handleDelete}>
				Confirmer
			</button>

			<button type="button" onClick={() => navigate("/admin/products")}>
				Annuler
			</button>
		</div>
	);
}
