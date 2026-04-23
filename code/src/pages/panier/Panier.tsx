"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Line_order } from "../../../models/line_order";
import { useAuth } from "../../context/AuthContext";
import ApiLineOrderService from "../../services/api_line_order_service";
import ApiOrdersService from "../../services/api_orders_service";
import styles from "./Panier.module.css";

export default function Panier() {
	const { user } = useAuth();
	const navigate = useNavigate();

	const [lines, setLines] = useState<Line_order[]>([]);
	const [loading, setLoading] = useState(true);
	const [_orderId, setOrderId] = useState<number | null>(null);

	// userId propre
	const userId = user?.id;
	const isLogged = !!userId;

	// Charger panier
	useEffect(() => {
		const fetchCart = async () => {
			if (!userId) {
				setLines([]);
				setLoading(false);
				return;
			}

			try {
				setLoading(true);

				const ordersService = new ApiOrdersService();
				const lineService = new ApiLineOrderService();

				// récupérer commandes
				const orderRes = await ordersService.selectUserCart(userId);
				const order = orderRes.data ?? null;

				if (!order) {
					setLines([]);
					setOrderId(null);
					return;
				}

				setOrderId(order.id);

				// récupérer lignes panier
				const linesRes = await lineService.selectAll();

				const filtered =
					linesRes.data?.filter((line) => line.order_id === order.id) ?? [];

				setLines(filtered);
			} catch (err) {
				console.error("Erreur panier :", err);
			} finally {
				setLoading(false);
			}
		};

		fetchCart();
	}, [userId]);

	// supprimer item
	const handleRemove = async (id: number) => {
		try {
			const service = new ApiLineOrderService();
			await service.delete(id);

			setLines((prev) => prev.filter((l) => l.id !== id));
		} catch (err) {
			console.error("Erreur suppression :", err);
		}
	};

	const lineService = new ApiLineOrderService();

	const handleIncrease = async (line: Line_order) => {
		try {
			await lineService.incrementQty(line.id, 1, line.product?.price ?? 0);

			setLines((prev) =>
				prev.map((l) =>
					l.id === line.id
						? {
								...l,
								qty: l.qty + 1,
								total: l.total + (l.product?.price ?? 0),
							}
						: l,
				),
			);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDecrease = async (line: Line_order) => {
		try {
			if (line.qty <= 1) {
				await handleRemove(line.id);
				return;
			}

			await lineService.incrementQty(line.id, -1, -(line.product?.price ?? 0));

			setLines((prev) =>
				prev.map((l) =>
					l.id === line.id
						? {
								...l,
								qty: l.qty - 1,
								total: l.total - (l.product?.price ?? 0),
							}
						: l,
				),
			);
		} catch (error) {
			console.error(error);
		}
	};

	// total optimisé (memo)
	const total = useMemo(() => {
		return lines.reduce((sum, l) => sum + (l.total ?? 0), 0);
	}, [lines]);

	// loading
	if (loading) return <p>Chargement du panier...</p>;

	return (
		<section className={styles.section}>
			<h1 className={styles.title}>Mon Panier</h1>

			{/* NOT CONNECTED */}
			{!isLogged ? (
				<p>Vous devez être connecté pour voir votre panier </p>
			) : lines.length === 0 ? (
				<p>Votre panier est vide 🛒</p>
			) : (
				<div className={styles.list}>
					{lines.map((line) => (
						<div key={line.id} className={styles.card}>
							<div>
								<h3>{line.product?.name}</h3>

								<div className={styles.qtyControls}>
									<button type="button" onClick={() => handleDecrease(line)}>
										-
									</button>

									<span>{line.qty}</span>

									<button type="button" onClick={() => handleIncrease(line)}>
										+
									</button>
								</div>

								<p>{line.total} €</p>
							</div>

							<div className={styles.footer}>
								<h2>Total : {total} €</h2>

								<button
									type="button"
									className={styles.pay}
									onClick={() => navigate("/checkout")}
								>
									Passer commande
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</section>
	);
}
