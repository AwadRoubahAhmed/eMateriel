import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import ProductList from "../../components/product/ProductList";
import Seo from "../../components/Seo";

export default function Products() {
	return (
		<>
			<Seo
				title="eMatériel - Products"
				description="La page Products"
				url="/products"
			/>
			<Navbar />
			<h1>Products page</h1>
             <ProductList />
			<Footer />
		</>
	);
}
