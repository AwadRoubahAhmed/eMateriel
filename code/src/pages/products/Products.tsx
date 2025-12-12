import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Seo from "../../components/Seo";

export default function Products() {
	return (
		<>
			<Navbar />
			<h1>Products page</h1>

			<Seo
				title="eMatériel - Products"
				description="La page Products"
				url="/products"
			/>
			<Footer />
		</>
	);
}
