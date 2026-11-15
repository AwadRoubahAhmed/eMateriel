import Product_Repository from "../../../server/repository/product_repository";
import ProductList from "../../components/product/ProductList";
import Seo from "../../components/Seo";
import Title from "../../components/title/Title";

export default async function Products() {
	const products = await new Product_Repository().selectAll();
	return (
		<section className="page">
			<Seo
				title="Nos produits"
				description="Smartphones, tablettes, ordinateurs et accessoires : tout le catalogue eMatériel, livré chez vous."
				path="/products"
			/>
			<Title title="Nos produits" as="h1" />
			<ProductList products={products} />
		</section>
	);
}
