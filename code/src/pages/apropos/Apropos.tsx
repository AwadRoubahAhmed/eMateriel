import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Seo from "../../components/Seo";

export default function Apropos() {
	return (
		<>
			<Navbar />
			<h1>À propos de nous</h1>
			<p>
				Bienvenue sur la page À propos de eMatériel. Nous sommes dédiés à
				fournir les meilleurs services et produits à nos clients.
			</p>

			<Seo
				title="eMatériel - A propos"
				description="La page a propos du site eMatériel."
				url="/apropos"
			/>
			<Footer />
		</>
	);
}
