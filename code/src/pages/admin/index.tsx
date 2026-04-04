import { Link } from "react-router-dom";
// import Guard from "../../components/Guard";
import Seo from "../../components/Seo";

const AdminHome = () => {
	return (
		<>
			<Seo
				title="eMatériel - Panier"
				description="La page Panier"
				url="/panier"
			/>

			{/* <Guard roles={["admin"]} />
 */}
			<h1>AdminHome</h1>

			<Link to={"/admin/products"}>Produits</Link>
		</>
	);
};

export default AdminHome;
