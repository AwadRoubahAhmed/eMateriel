import { use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiProductService from "../../../services/api_product_service";
import styles from "../admin.module.css";

export default function Delete() {
	const { id } = useParams();
	const navigate = useNavigate();

	const product = use(new ApiProductService().selectOne(Number(id)));

	const handleDelete = async () => {
		const res = await new ApiProductService().delete(Number(id));

		if (res.status === 200) {
			navigate("/admin/products");
		}
	};

	return (
		<div className={styles.AdminProductDelete}>
			<h2>Supprimer produit</h2>
			{product?.data && <p>Produit ID: {product.data.id}</p>}

			<button type="button" onClick={handleDelete}>
				Confirmer
			</button>
			<button type="button" onClick={() => navigate("/admin/products")}>
				Annuler
			</button>
		</div>
	);
}
