import AdminCategoryHomeContent from "../../../components/admin/categorie/AdminCategoryHomeContent";
import Seo from "../../../components/Seo";

const AdminCategoryHome = () => {
	return (
		<>
			<Seo
				title="Admin Catégories"
				description="Gestion des catégories"
				url="/admin/categories"
			/>

			<AdminCategoryHomeContent />
		</>
	);
};

export default AdminCategoryHome;
