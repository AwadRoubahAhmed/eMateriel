import { Link } from "react-router-dom";
import Seo from "../../components/Seo";
import { LEGAL } from "../../data/legal";

export default function MentionsLegales() {
	return (
		<article className="page legal">
			<Seo title="Mentions légales" description="Mentions légales du site eMatériel." path="/mentions-legales" />
			<h1>Mentions légales</h1>

			<h2>Éditeur du site</h2>
			<p>
				{LEGAL.editor}, {LEGAL.legalForm}
				<br />
				SIRET : {LEGAL.siret}
				<br />
				TVA : {LEGAL.vat}
				<br />
				Adresse : {LEGAL.address}
				<br />
				Email : {LEGAL.email}
				<br />
				Directeur de la publication : {LEGAL.publicationDirector}
			</p>

			<h2>Hébergeur</h2>
			<p>
				{LEGAL.host.name}, {LEGAL.host.address}. Site : {LEGAL.host.site}
			</p>

			<h2>Propriété intellectuelle</h2>
			<p>
				Les textes, la structure et le code du site sont protégés par le droit d'auteur. Les marques
				et visuels de produits appartiennent à leurs propriétaires respectifs et sont utilisés pour
				présenter les articles vendus. Toute reproduction sans autorisation est interdite.
			</p>

			<h2>Données personnelles et cookies</h2>
			<p>
				Le traitement de vos données est décrit dans la{" "}
				<Link to="/politique-confidentialite">politique de confidentialité</Link>. Vous pouvez modifier
				vos choix de cookies à tout moment via le lien « Gérer les cookies » en bas de page.
			</p>

			<h2>Conditions de vente et d'utilisation</h2>
			<p>
				Les achats sont régis par les <Link to="/cgv">conditions générales de vente</Link> et l'usage du
				site par les <Link to="/cgu">conditions générales d'utilisation</Link>.
			</p>

			<p>Dernière mise à jour : {LEGAL.lastUpdate}</p>
		</article>
	);
}
