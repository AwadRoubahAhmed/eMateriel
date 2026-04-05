import ProductList from "../../components/product/ProductList";
import Seo from "../../components/Seo";
import Title from "../../components/title/Title";


export default function Products() {
	return (
		<>
			<Seo
				title="eMatériel - Products"
				description="La page Products"
				url="/products"
			/>

			<Title title="Nos Produits" />
			<ProductList />
		</>
	);
}
