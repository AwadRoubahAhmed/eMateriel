"use client";

import { Link } from "react-router-dom";
import type { Contact } from "../../../models/contact";
import type { Orders } from "../../../models/orders";
import type { Product } from "../../../models/product";
import { formatPrice } from "../../utils/format";
import { useAdminData } from "./useAdminData";

const LOW_STOCK = 5;

export default function AdminHome() {
	const orders = useAdminData<Orders[]>("/api/orders").data ?? [];
	const products = useAdminData<Product[]>("/api/product").data ?? [];
	const messages = useAdminData<Contact[]>("/api/contact").data ?? [];

	const toShip = orders.filter((o) => o.status === "payee").length;
	const revenue = orders
		.filter((o) => ["payee", "expediee", "livree"].includes(o.status))
		.reduce((sum, o) => sum + o.total, 0);
	const lowStock = products.filter((p) => p.stock <= LOW_STOCK);
	const unread = messages.filter((m) => !m.is_read).length;

	const cards = [
		{ label: "Commandes à expédier", value: toShip, to: "/admin/orders" },
		{ label: "Chiffre d'affaires encaissé", value: formatPrice(revenue), to: "/admin/orders" },
		{ label: `Produits en stock faible (≤ ${LOW_STOCK})`, value: lowStock.length, to: "/admin/products" },
		{ label: "Messages non lus", value: unread, to: "/admin/messages" },
	];

	return (
		<>
			<h1>Tableau de bord</h1>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
				{cards.map((card) => (
					<Link
						key={card.label}
						to={card.to}
						style={{ display: "block", padding: "1.25rem", border: "1px solid var(--border)", borderRadius: "var(--radius)", color: "var(--text)", textDecoration: "none" }}
					>
						<span style={{ display: "block", fontSize: "1.8rem", fontWeight: 700 }}>{card.value}</span>
						<span style={{ color: "var(--muted)" }}>{card.label}</span>
					</Link>
				))}
			</div>

			{lowStock.length > 0 && (
				<>
					<h2 style={{ fontSize: "1.2rem", margin: "2rem 0 0.75rem" }}>Stock faible</h2>
					<ul style={{ lineHeight: 1.8 }}>
						{lowStock.map((p) => (
							<li key={p.id}>
								<Link to={`/admin/product/update/${p.id}`} style={{ color: "var(--primary)" }}>
									{p.name}
								</Link>{" "}
								: {p.stock} en stock
							</li>
						))}
					</ul>
				</>
			)}
		</>
	);
}
