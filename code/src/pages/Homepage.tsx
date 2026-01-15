import Hero from "../components/hero/Hero";
import Seo from "../components/Seo";

export default function Homepage() {
	return (
		<>
			{/* Composant Navbar */}

			<div>
				<Seo
					title="eMatériel - Accueil"
					description="La page d'accueil"
					url="/"
				/>

				{/* Composant Hero */}
				<Hero />

				{/* Contenu de la page d'accueil */}
				<h1>Contenu de la page d'accueil</h1>

				{/* Composant Footer */}
			</div>
		</>
	);
}
