"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Orders } from "../../../models/orders";
import RequireAuth from "../../components/auth/RequireAuth";
import Seo from "../../components/Seo";
import { api, errorMessage } from "../../services/api";
import { formatDate, formatPrice, ORDER_STATUS_LABELS } from "../../utils/format";

function OrderList() {
	const [orders, setOrders] = useState<Orders[] | null>(null);
	const [error, setError] = useState("");

	useEffect(() => {
		api<Orders[]>("/api/orders/mine").then((result) =>
			result.status === 200 ? setOrders(result.data ?? []) : setError(errorMessage(result)),
		);
	}, []);

	if (error) return <p className="form-message error" role="alert">{error}</p>;
	if (!orders) return <p role="status">Chargement…</p>;
	if (orders.length === 0) {
		return (
			<p>
				Vous n'avez pas encore passé de commande. <Link to="/products">Voir les produits</Link>
			</p>
		);
	}

	return (
		<div style={{ display: "grid", gap: "1rem" }}>
			{orders.map((order) => (
				<article key={order.id} style={{ background: "#fff", padding: "1.25rem", borderRadius: "var(--radius)" }}>
					<h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
						Commande n° {order.id} du {formatDate(order.created_at)}{" "}
						<span className={`badge badge-${order.status}`}>{ORDER_STATUS_LABELS[order.status]}</span>
					</h2>
					<ul style={{ margin: "0.75rem 0", lineHeight: 1.6 }}>
						{order.line_orders?.map((line) => (
							<li key={line.id}>
								{line.product_name} × {line.qty} : {formatPrice(line.total)}
							</li>
						))}
					</ul>
					<p>
						Total : <strong>{formatPrice(order.total)}</strong>. Livraison : {order.shipping_name},{" "}
						{order.shipping_address}, {order.shipping_zip} {order.shipping_city}
					</p>
				</article>
			))}
		</div>
	);
}

export default function MyOrders() {
	return (
		<section className="page">
			<Seo title="Mes commandes" description="Suivi de vos commandes." path="/mes-commandes" noindex />
			<h1>Mes commandes</h1>
			<RequireAuth>
				<OrderList />
			</RequireAuth>
		</section>
	);
}
