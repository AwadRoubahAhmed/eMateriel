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
					<Link className={styles.AdminProduct} to={"/admin/products"}>
						Produits
					</Link>

					<Link className={styles.AdminCategory} to={"/admin/categories"}>
						Catégories
					</Link>
				</div>
			</section>
		</>
	);
};

export default AdminHome;
