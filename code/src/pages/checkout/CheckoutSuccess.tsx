"use client";

import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Orders } from "../../../models/orders";
import RequireAuth from "../../components/auth/RequireAuth";
import Seo from "../../components/Seo";
import { api, errorMessage } from "../../services/api";
import { clearCart } from "../../services/cart_service";
import { formatPrice } from "../../utils/format";

function Confirmation() {
	const [params] = useSearchParams();
	const orderId = Number(params.get("order"));
	const [order, setOrder] = useState<Orders | null>(null);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!orderId) return setError("Commande inconnue");
		// le serveur vérifie lui-même auprès de Stripe que le paiement est passé
		api<Orders>(`/api/orders/${orderId}/confirm`, { method: "POST" }).then((result) => {
			if (result.status !== 200 || !result.data) return setError(errorMessage(result));
			setOrder(result.data);
			if (result.data.status === "payee") clearCart();
		});
	}, [orderId]);

	if (error) return <p className="form-message error" role="alert">{error}</p>;
	if (!order) return <p role="status">Vérification du paiement…</p>;

	return order.status === "payee" ? (
		<div role="status">
			<p className="form-message success">
				Merci ! Votre commande n° {order.id} de {formatPrice(order.total)} est confirmée.
			</p>
			<p>Vous pouvez suivre sa préparation et son expédition depuis votre espace.</p>
			<p style={{ marginTop: "1rem" }}>
				<Link to="/mes-commandes" className="btn">
					Voir mes commandes
				</Link>
			</p>
		</div>
	) : (
		<div role="status">
			<p className="form-message error">
				Le paiement de la commande n° {order.id} n'est pas encore confirmé.
			</p>
			<p>
				Si vous avez bien payé, actualisez cette page dans quelques instants. Sinon, votre panier est
				toujours disponible.
			</p>
			<p style={{ marginTop: "1rem" }}>
				<Link to="/panier" className="btn">
					Retour au panier
				</Link>
			</p>
		</div>
	);
}

export default function CheckoutSuccess() {
	return (
		<section className="page">
			<Seo title="Confirmation de commande" description="Confirmation de votre commande." path="/commande/confirmation" noindex />
			<h1>Confirmation de commande</h1>
			<RequireAuth>
				<Confirmation />
			</RequireAuth>
		</section>
	);
}
