import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Seo from "../../components/Seo";

export default function Panier() {
	return (
		<>
			<Seo
				title="eMatériel - Panier"
				description="La page Panier"
				url="/panier"
			/>

			<Navbar />
			<h1>Panier page</h1>
			<Footer />
		</>
	);
}
