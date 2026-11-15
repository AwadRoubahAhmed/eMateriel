import Orders_Repository, { OrderError } from "../repository/orders_repository";
import StripeService from "./stripe_service";

type PendingOrder = { id: number; stripe_session_id?: string | null };

// Accorde l'état d'une commande avec Stripe, la seule source de vérité sur le paiement.
class OrderPaymentService {
	private repository = new Orders_Repository();
	private stripe = new StripeService();

	// Stripe confirme le paiement → commande « payée ». Renvoie true si payée.
	public syncPaid = async (order: PendingOrder) => {
		if (!order.stripe_session_id) return false;
		const session = await this.stripe.retrieveSession(order.stripe_session_id);
		if (session.payment_status !== "paid" || session.metadata.order_id !== String(order.id)) {
			return false;
		}
		try {
			await this.repository.setStatus(order.id, "payee");
		} catch (error) {
			// déjà passée à un autre statut par une requête concurrente : rien à faire
			if (!(error instanceof OrderError)) throw error;
		}
		return true;
	};

	// Annule une commande non payée : la page Stripe est d'abord fermée pour qu'on ne puisse
	// plus payer une commande dont le stock a été rendu. Renvoie l'état final.
	public cancelUnpaid = async (order: PendingOrder): Promise<"payee" | "annulee"> => {
		if (await this.syncPaid(order)) return "payee";
		if (order.stripe_session_id) {
			try {
				await this.stripe.expireSession(order.stripe_session_id);
			} catch (error) {
				// paiement terminé entre-temps : Stripe refuse l'expiration
				if (await this.syncPaid(order)) return "payee";
				throw error;
			}
		}
		await this.repository.setStatus(order.id, "annulee");
		return "annulee";
	};

	// Libère le stock des commandes abandonnées (page de paiement expirée sans paiement)
	public sweep = async (olderThanMinutes: number) => {
		const stale = await this.repository.selectStalePending(olderThanMinutes);
		for (const order of stale) {
			try {
				await this.cancelUnpaid(order);
			} catch (error) {
				console.error(`Nettoyage de la commande ${order.id} impossible`, error);
			}
		}
		return stale.length;
	};
}

export default OrderPaymentService;
