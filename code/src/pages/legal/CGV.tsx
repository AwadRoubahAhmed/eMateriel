import { Link } from "react-router-dom";
import Seo from "../../components/Seo";
import { LEGAL } from "../../data/legal";

export default function CGV() {
	return (
		<article className="page legal">
			<Seo title="Conditions générales de vente" description="Conditions générales de vente d'eMatériel : commande, prix, paiement, livraison, rétractation, garanties." path="/cgv" />
			<h1>Conditions générales de vente</h1>

			<h2>1. Objet</h2>
			<p>
				Les présentes conditions régissent les ventes conclues sur le site {LEGAL.siteName}, édité par{" "}
				{LEGAL.editor} (voir les <Link to="/mentions-legales">mentions légales</Link>), entre le vendeur
				et tout acheteur consommateur. Passer commande vaut acceptation des présentes conditions.
			</p>

			<h2>2. Produits</h2>
			<p>
				Les caractéristiques essentielles de chaque produit sont présentées sur sa fiche. Les photos
				sont non contractuelles. Les offres sont valables dans la limite des stocks disponibles, le stock
				étant vérifié au moment de la commande.
			</p>

			<h2>3. Prix</h2>
			<p>
				Les prix sont indiqués en euros, toutes taxes comprises (TTC). Frais de livraison :{" "}
				{LEGAL.deliveryCost}. Le montant total à payer est affiché avant la validation du paiement. Le
				prix applicable est celui en vigueur au moment de la commande.
			</p>

			<h2>4. Commande</h2>
			<p>
				Pour commander, l'acheteur crée un compte, ajoute les produits au panier, indique son adresse de
				livraison puis valide la commande en cliquant sur le bouton « Payer », qui emporte obligation de
				paiement. Une confirmation s'affiche après le paiement et la commande apparaît dans l'espace
				« Mes commandes ».
			</p>

			<h2>5. Paiement</h2>
			<p>
				Le paiement s'effectue par carte bancaire sur la page sécurisée de notre prestataire Stripe. Les
				données bancaires ne transitent pas par nos serveurs. La commande n'est traitée qu'après
				confirmation du paiement.
			</p>

			<h2>6. Livraison</h2>
			<p>
				Les produits sont livrés à l'adresse indiquée lors de la commande, en {LEGAL.deliveryArea}, dans
				un délai de {LEGAL.deliveryDelay} à compter de la confirmation du paiement. En cas de retard de
				plus de 30 jours, l'acheteur peut annuler la commande dans les conditions de l'article L216-6 du
				Code de la consommation.
			</p>

			<h2>7. Droit de rétractation</h2>
			<p>
				L'acheteur dispose d'un délai de 14 jours à compter de la réception du produit pour se rétracter,
				sans avoir à se justifier (articles L221-18 et suivants du Code de la consommation). Il en informe
				le vendeur par le <Link to="/contact">formulaire de contact</Link> ou par email ({LEGAL.email})
				en indiquant son numéro de commande, puis renvoie le produit dans les 14 jours suivants. Les frais
				de retour sont à la charge de l'acheteur. Le remboursement, frais de livraison initiaux compris,
				intervient dans les 14 jours suivant la rétractation, par le même moyen de paiement ; il peut
				être différé jusqu'à réception du produit.
			</p>

			<h2>8. Garanties</h2>
			<p>
				Les produits bénéficient de la garantie légale de conformité (articles L217-3 et suivants du Code
				de la consommation, 2 ans à compter de la livraison) et de la garantie des vices cachés (articles
				1641 et suivants du Code civil).
			</p>

			<h2>9. Réclamations et médiation</h2>
			<p>
				Toute réclamation peut être adressée via le <Link to="/contact">formulaire de contact</Link>. En
				cas de litige non résolu, l'acheteur peut recourir gratuitement au médiateur de la consommation :{" "}
				{LEGAL.mediator}.
			</p>

			<h2>10. Données personnelles</h2>
			<p>
				Les données collectées pour la commande sont traitées conformément à notre{" "}
				<Link to="/politique-confidentialite">politique de confidentialité</Link>.
			</p>

			<h2>11. Droit applicable</h2>
			<p>Les présentes conditions sont soumises au droit français.</p>

			<p>Dernière mise à jour : {LEGAL.lastUpdate}</p>
		</article>
	);
}
