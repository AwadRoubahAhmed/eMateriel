// Stripe Checkout via l'API HTTP (pas besoin du SDK pour deux appels).
// Mode test uniquement : une clé sk_live_ est refusée.

type CheckoutLine = { product_name: string; unit_price: number; qty: number };

const API = "https://api.stripe.com/v1";
export const SESSION_TTL_SECONDS = 31 * 60;

const getKey = () => {
	const key = process.env.STRIPE_SECRET_KEY;
	if (!key) return null;
	if (!key.startsWith("sk_test_")) {
		throw new Error("Seule une clé Stripe de TEST (sk_test_…) est acceptée");
	}
	return key;
};

const call = async (path: string, init: RequestInit = {}) => {
	const response = await fetch(`${API}${path}`, {
		...init,
		headers: {
			Authorization: `Bearer ${getKey()}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
	const json = await response.json();
	if (!response.ok) throw new Error(json?.error?.message ?? "Erreur Stripe");
	return json;
};

class StripeService {
	public isConfigured = () => Boolean(getKey());

	public createCheckoutSession = async (params: {
		orderId: number;
		email: string;
		lines: CheckoutLine[];
		siteUrl: string;
	}): Promise<{ id: string; url: string }> => {
		const form = new URLSearchParams({
			mode: "payment",
			customer_email: params.email,
			client_reference_id: String(params.orderId),
			"metadata[order_id]": String(params.orderId),
			// la page de paiement expire (minimum Stripe : 30 min) : le stock réservé est ensuite libéré
			expires_at: String(Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS),
			success_url: `${params.siteUrl}/commande/confirmation?order=${params.orderId}`,
			cancel_url: `${params.siteUrl}/commande/annulee?order=${params.orderId}`,
		});
		params.lines.forEach((line, i) => {
			form.set(`line_items[${i}][quantity]`, String(line.qty));
			form.set(`line_items[${i}][price_data][currency]`, "eur");
			form.set(
				`line_items[${i}][price_data][unit_amount]`,
				String(Math.round(line.unit_price * 100)),
			);
			form.set(`line_items[${i}][price_data][product_data][name]`, line.product_name);
		});
		return call("/checkout/sessions", { method: "POST", body: form });
	};

	public retrieveSession = async (
		id: string,
	): Promise<{ status: string; payment_status: string; metadata: { order_id?: string } }> =>
		call(`/checkout/sessions/${encodeURIComponent(id)}`);

	// rend la page de paiement inutilisable (sans effet si elle a déjà expiré)
	public expireSession = async (id: string) => {
		const session = await this.retrieveSession(id);
		if (session.status === "open") {
			await call(`/checkout/sessions/${encodeURIComponent(id)}/expire`, { method: "POST" });
		}
	};
}

export default StripeService;
