import { Link } from "react-router-dom";
import Seo from "../../components/Seo";
import { LEGAL } from "../../data/legal";

export default function CGU() {
	return (
		<article className="page legal">
			<Seo title="Conditions générales d'utilisation" description="Conditions générales d'utilisation du site eMatériel." path="/cgu" />
			<h1>Conditions générales d'utilisation</h1>

			<h2>1. Objet</h2>
			<p>
				Les présentes conditions encadrent l'utilisation du site {LEGAL.siteName}. Les achats relèvent en
				plus des <Link to="/cgv">conditions générales de vente</Link>.
			</p>

			<h2>2. Compte utilisateur</h2>
			<p>
				La création d'un compte est gratuite et nécessaire pour commander. L'utilisateur fournit une
				adresse email valide et choisit un mot de passe personnel qu'il garde confidentiel. Il est
				responsable de l'usage fait de son compte. Il peut demander la suppression de son compte via le{" "}
				<Link to="/contact">formulaire de contact</Link>.
			</p>

			<h2>3. Usage du site</h2>
			<p>
				L'utilisateur s'engage à ne pas perturber le fonctionnement du site (tentatives d'intrusion,
				envois automatisés, contenus illicites dans le formulaire de contact). L'éditeur peut suspendre
				un compte en cas d'usage abusif.
			</p>

			<h2>4. Disponibilité</h2>
			<p>
				L'éditeur s'efforce de maintenir le site accessible, sans garantie de disponibilité permanente.
				Des interruptions peuvent avoir lieu pour maintenance.
			</p>

			<h2>5. Responsabilité</h2>
			<p>
				Les informations du site sont fournies avec soin mais peuvent contenir des erreurs. L'éditeur ne
				saurait être tenu responsable d'un dommage résultant d'une utilisation non conforme du site.
			</p>

			<h2>6. Données personnelles</h2>
			<p>
				Voir la <Link to="/politique-confidentialite">politique de confidentialité</Link>.
			</p>

			<h2>7. Modification</h2>
			<p>
				Ces conditions peuvent évoluer ; la version applicable est celle en ligne lors de l'utilisation
				du site.
			</p>

			<p>Dernière mise à jour : {LEGAL.lastUpdate}</p>
		</article>
	);
}
