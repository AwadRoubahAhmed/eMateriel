import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiCategoryService from "../../../services/api_category_service";
import SecurityService from "../../../services/security_service";

export default function DeleteCategory() {
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const runDelete = async () => {
			if (!id) {
				alert("ID invalide");
				navigate("/admin/categories");
				return;
			}

			const confirmDelete = window.confirm(
				`Confirmer la suppression de la catégorie ID ${id} ?`,
			);

			if (!confirmDelete) {
				navigate("/admin/categories");
				return;
			}

			const token = new SecurityService().getToken();

			if (!token) {
				alert("Non autorisé");
				navigate("/admin/categories");
				return;
			}

			const res = await new ApiCategoryService().delete(Number(id), token);

			if (res.status === 200) {
				alert("Catégorie supprimée avec succès");
			} else {
				alert("Erreur suppression");
			}

			navigate("/admin/categories");
		};

		runDelete();
	}, [id, navigate]);

	return <p>Suppression en cours...</p>;
}
