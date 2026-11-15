"use client";

import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import RequireAuth from "../../components/auth/RequireAuth";
import Seo from "../../components/Seo";
import { api } from "../../services/api";

function Cancelled() {
	const [params] = useSearchParams();
	const orderId = Number(params.get("order"));
	const [done, setDone] = useState(false);

	// paiement abandonné : on annule la commande pour remettre les produits en stock
	useEffect(() => {
		if (orderId) api(`/api/orders/${orderId}/cancel`, { method: "POST" }).then(() => setDone(true));
	}, [orderId]);

	return (
		<div role="status">
			<p>Le paiement a été annulé, aucun montant n'a été débité.</p>
			<p>{done ? "Votre panier est conservé : vous pouvez réessayer quand vous voulez." : ""}</p>
			<p style={{ marginTop: "1rem" }}>
				<Link to="/panier" className="btn">
					Retour au panier
				</Link>
			</p>
		</div>
	);
}

export default function CheckoutCancel() {
	return (
		<section className="page">
			<Seo title="Paiement annulé" description="Paiement annulé." path="/commande/annulee" noindex />
			<h1>Paiement annulé</h1>
			<RequireAuth>
				<Cancelled />
			</RequireAuth>
		</section>
	);
}
