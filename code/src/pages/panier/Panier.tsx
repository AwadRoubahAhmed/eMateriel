"use client";

import { useEffect, useState } from "react";
import type { Line_order } from "../../../models/line_order";
import Seo from "../../components/Seo";
import ApiLineOrderService from "../../services/api_line_order_service";
import ApiOrdersService from "../../services/api_orders_service";
import styles from "./Panier.module.css";

export default function Panier() {
	const [lineOrders, setLineOrders] = useState<Line_order[]>([]);
	const [loading, setLoading] = useState(true);

	// Fetch panier côté client
	useEffect(() => {
		const fetchOrder = async () => {
			const result = await new ApiOrdersService().selectAll();
			const order = result.data?.[0];
			setLineOrders(order?.line_orders ?? []);
			setLoading(false);
		};
		fetchOrder();
	}, []);

	// Calcul du total (ne prend en compte que les lignes avec produit)
	const total = lineOrders.reduce(
		(acc, item) => acc + (item.product ? (item.total ?? 0) : 0),
		0,
	);

	// Modifier la quantité
	const handleQtyChange = async (line: Line_order, delta: number) => {
		if (!line.product) return;

		const newQty = line.qty + delta;
		if (newQty < 1) return;

		const updatedLine = {
			...line,
			qty: newQty,
			total: line.product.price * newQty,
		};

		await new ApiLineOrderService().update(line.id, updatedLine);
		setLineOrders((prev) =>
			prev.map((l) => (l.id === line.id ? updatedLine : l)),
		);
	};

	// Supprimer une ligne du panier
	const handleRemove = async (lineId: number) => {
		await new ApiLineOrderService().delete(lineId);
		setLineOrders((prev) => prev.filter((l) => l.id !== lineId));
	};

	if (loading) return <p>Chargement du panier...</p>;

	return (
		<>
			<Seo
				title="eMatériel - Panier"
				description="La page Panier"
				url="/panier"
			/>

			<section className={styles.container}>
				<h1 className={styles.title}>Mon Panier</h1>

				{lineOrders.length ? (
					<div className={styles.layout}>
						{/* Liste des produits */}
						<div className={styles.items}>
							{lineOrders.map((line) => {
								const product = line.product;

								// Produit non disponible
								if (!product) {
									return (
										<article key={line.id} className={styles.card}>
											<div className={styles.content}>
												<h2>Produit non disponible</h2>
												<p>Ce produit n'est plus dans notre catalogue.</p>
												<div className={styles.actions}>
													<button
														type="button"
														className={styles.removeBtn}
														onClick={() => handleRemove(line.id)}
													>
														🗑 Supprimer
													</button>
												</div>
											</div>
										</article>
									);
								}

								// Ligne avec produit valide
								return (
									<article key={line.id} className={styles.card}>
										<img
											src={`/images/${product.image}`}
											alt={product.name}
											className={styles.image}
										/>
										<div className={styles.content}>
											<h2>{product.name}</h2>
											<p className={styles.description}>
												{product.description}
											</p>

											<div className={styles.meta}>
												<span className={styles.price}>
													{(product.price ?? 0).toLocaleString("fr-FR", {
														style: "currency",
														currency: "EUR",
													})}
												</span>
												<span className={styles.qty}>
													Qté :
													<button
														type="button"
														onClick={() => handleQtyChange(line, -1)}
													>
														-
													</button>
													<span>{line.qty}</span>
													<button
														type="button"
														onClick={() => handleQtyChange(line, 1)}
													>
														+
													</button>
												</span>
											</div>

											<div className={styles.actions}>
												<span className={styles.lineTotal}>
													Total :{" "}
													{(line.total ?? 0).toLocaleString("fr-FR", {
														style: "currency",
														currency: "EUR",
													})}
												</span>
												<button
													type="button"
													className={styles.removeBtn}
													onClick={() => handleRemove(line.id)}
												>
													🗑 Supprimer
												</button>
											</div>
										</div>
									</article>
								);
							})}
						</div>

						{/* Résumé */}
						<aside className={styles.summary}>
							<h2>Résumé</h2>
							<div className={styles.summaryRow}>
								<span>Total</span>
								<span>
									{total.toLocaleString("fr-FR", {
										style: "currency",
										currency: "EUR",
									})}
								</span>
							</div>
							<button type="button" className={styles.checkoutBtn}>
								Valider la commande
							</button>
						</aside>
					</div>
				) : (
					<p className={styles.empty}>Votre panier est vide</p>
				)}
			</section>
		</>
	);
}
