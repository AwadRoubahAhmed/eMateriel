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
	const [orderId, setOrderId] = useState<number | null>(null);

	// userId propre
	const userId = user?.id;
	const isLogged = !!userId;

	// Charger panier
	useEffect(() => {
		const fetchCart = async () => {
			if (!userId) {
				setLoading(false);
				return;
			}

			try {
				setLoading(true);

				const ordersService = new ApiOrdersService();
				const lineService = new ApiLineOrderService();

				// récupérer commandes
				const ordersRes = await ordersService.selectAll();

				const order = ordersRes.data?.find(
					(o) => o.user_id === userId
				);

				if (!order) {
					setLines([]);
					setOrderId(null);
					return;
				}

				setOrderId(order.id);

				// récupérer lignes panier
				const linesRes = await lineService.selectAll();

				const filtered =
					linesRes.data?.filter(
						(line) => line.order_id === order.id
					) ?? [];

				setLines(filtered);
			} catch (err) {
				console.error("Erreur panier :", err);
			} finally {
				setLoading(false);
			}
		};

		fetchCart();
	}, [userId, navigate]);

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
				<>
					<div className={styles.list}>
						{lines.map((line) => (
							<div key={line.id} className={styles.card}>
								<div>
									<h3>{line.product?.name}</h3>
									<p>Quantité : {line.qty}</p>
									<p>{line.total} €</p>
								</div>

								<button
									onClick={() => handleRemove(line.id)}
									className={styles.delete}
								>
									Supprimer
								</button>
							</div>
						))}
					</div>

					<div className={styles.footer}>
						<h2>Total : {total} €</h2>

						<button
							className={styles.pay}
							onClick={() => alert("Commande validée")}
						>
							Passer commande
						</button>
					</div>
				</>
			)}
		</section>
	);
}