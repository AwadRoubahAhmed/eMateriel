import AdminProductHomeContent from "../../../components/admin/product/admin_product_home_content";
import Seo from "../../../components/Seo";

const AdminProductHome = () => {
	return (
		<>
			<Seo
				title="eMatériel - Panier"
				description="La page Panier"
				url="/panier"
			/>

			<AdminProductHomeContent />
		</>
	);
};

export default AdminProductHome;
