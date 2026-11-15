"use client";

import { Fragment, useState } from "react";
import { ORDER_TRANSITIONS, type Orders, type OrderStatus } from "../../../../models/orders";
import { api, errorMessage } from "../../../services/api";
import { formatDate, formatPrice, ORDER_STATUS_LABELS } from "../../../utils/format";
import { useAdminData } from "../useAdminData";

const STATUSES = Object.keys(ORDER_STATUS_LABELS) as OrderStatus[];

export default function AdminOrders() {
	const { data: orders, error, setError, reload } = useAdminData<Orders[]>("/api/orders");
	const [open, setOpen] = useState<Orders | null>(null);
	const [notice, setNotice] = useState("");
	const [filter, setFilter] = useState<OrderStatus | "">("");

	const changeStatus = async (order: Orders, status: OrderStatus) => {
		const refund = order.status === "payee" ? " Pensez à rembourser le client depuis votre tableau de bord Stripe." : "";
		if (status === "annulee" && !window.confirm(`Annuler la commande n° ${order.id} ? Les produits seront remis en stock.${refund}`)) return;
		const result = await api(`/api/orders/${order.id}/status`, { method: "PATCH", body: { status } });
		if (result.status !== 200) return setError(errorMessage(result));
		setNotice(`Commande n° ${order.id} : ${ORDER_STATUS_LABELS[status]}`);
		reload();
	};

	const toggleDetail = async (order: Orders) => {
		if (open?.id === order.id) return setOpen(null);
		const result = await api<Orders>(`/api/orders/${order.id}`);
		if (result.data) setOpen(result.data);
	};

	const visible = (orders ?? []).filter((o) => !filter || o.status === filter);

	return (
		<>
			<h1>Commandes</h1>
			<div className="field" style={{ maxWidth: 280 }}>
				<label htmlFor="order-filter">Filtrer par statut</label>
				<select id="order-filter" value={filter} onChange={(e) => setFilter(e.target.value as OrderStatus | "")}>
					<option value="">Toutes</option>
					{STATUSES.map((s) => (
						<option key={s} value={s}>
							{ORDER_STATUS_LABELS[s]}
						</option>
					))}
				</select>
			</div>
			<div role="status" aria-live="polite">
				{notice && <p className="form-message success">{notice}</p>}
			</div>
			{error && <p className="form-message error" role="alert">{error}</p>}

			{!orders ? (
				<p>Chargement…</p>
			) : visible.length === 0 ? (
				<p>Aucune commande.</p>
			) : (
				<div className="table-wrap">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">N°</th>
								<th scope="col">Date</th>
								<th scope="col">Client</th>
								<th scope="col">Total</th>
								<th scope="col">Statut</th>
								<th scope="col">Détail</th>
							</tr>
						</thead>
						<tbody>
							{visible.map((order) => (
								<Fragment key={order.id}>
									<tr>
										<td>{order.id}</td>
										<td>{formatDate(order.created_at)}</td>
										<td>{order.user_email}</td>
										<td>{formatPrice(order.total)}</td>
										<td>
											<label className="sr-only" htmlFor={`status-${order.id}`}>
												Statut de la commande {order.id}
											</label>
											<select
												id={`status-${order.id}`}
												value={order.status}
												disabled={ORDER_TRANSITIONS[order.status].length === 0}
												onChange={(e) => changeStatus(order, e.target.value as OrderStatus)}
												style={{ minHeight: "36px", borderRadius: "6px", border: "1px solid #6b7280", padding: "0 0.4rem" }}
											>
												{/* seulement les changements autorisés par l'API */}
												{[order.status, ...ORDER_TRANSITIONS[order.status]].map((s) => (
													<option key={s} value={s}>
														{ORDER_STATUS_LABELS[s]}
													</option>
												))}
											</select>
										</td>
										<td>
											<button type="button" className="btn btn-secondary btn-small" aria-expanded={open?.id === order.id} onClick={() => toggleDetail(order)}>
												{open?.id === order.id ? "Masquer" : "Voir"}
											</button>
										</td>
									</tr>
									{open?.id === order.id && (
										<tr>
											<td colSpan={6} style={{ background: "var(--bg-soft)" }}>
												<p>
													<strong>Livraison :</strong> {open.shipping_name}, {open.shipping_address}, {open.shipping_zip}{" "}
													{open.shipping_city}, tél. {open.shipping_phone}
												</p>
												<ul style={{ margin: "0.5rem 0 0 1.25rem", listStyle: "disc" }}>
													{open.line_orders?.map((line) => (
														<li key={line.id}>
															{line.product_name} × {line.qty} à {formatPrice(line.unit_price)} = {formatPrice(line.total)}
														</li>
													))}
												</ul>
											</td>
										</tr>
									)}
								</Fragment>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}
