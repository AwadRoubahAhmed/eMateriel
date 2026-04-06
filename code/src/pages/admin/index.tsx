import { Link } from "react-router-dom";
// import Guard from "../../components/Guard";
import Seo from "../../components/Seo";
import Title from "../../components/title/Title";
import styles from "./admin.module.css";

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
			<section className={styles.AdminHome}>
				<Title title="AdminHome" />

				<div className={styles.AdminButtons}>
					<Link to={"/admin/products"}>Produits</Link>

					<Link to={"/admin/products"}>Categories</Link>

					<Link to={"/admin/products"}>User</Link>

					<Link to={"/admin/products"}>Commandes</Link>
				</div>
			</section>
		</>
	);
};

export default AdminHome;
