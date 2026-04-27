"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Line_order } from "../../../models/line_order";
import type { Orders } from "../../../models/orders";
import { useAuth } from "../../context/AuthContext";
import ApiLineOrderService from "../../services/api_line_order_service";
import ApiOrdersService from "../../services/api_orders_service";
import styles from "./Panier.module.css";

export default function Panier() {
	const { user } = useAuth();
	const navigate = useNavigate();

	const [_orderId, setOrderId] = useState<number | null>(null);
	const [lines, setLines] = useState<Line_order[]>([]);
	const [loading, setLoading] = useState(true);

	const lineService = new ApiLineOrderService();

	useEffect(() => {
		const fetchCart = async () => {
			try {
				setLoading(true);

				const ordersService = new ApiOrdersService();
				const lineService = new ApiLineOrderService(); // ✔️ ici

				const userId = user?.id ?? null;

				let order: Orders | null = null;

				// ✔️ panier user
				if (userId) {
					const res = await ordersService.selectUserCart(userId);
					order = res.data ?? null;
				}

				// ✔️ panier guest fallback
				if (!order) {
					const res = await ordersService.selectAll();

					order =
						res.data?.find(
							(o) => o.user_id === null || o.user_id === undefined,
						) ?? null;
				}

				if (!order) {
					setLines([]);
					return;
				}

				setOrderId(order.id);

				// ✔️ fetch lignes
				const linesRes = await lineService.selectByOrder(order.id);
				setLines(linesRes.data ?? []);
			} catch (err) {
				console.error("CART ERROR:", err);
				setLines([]);
			} finally {
				setLoading(false);
			}
		};

		fetchCart();
	}, [user?.id]);

	const handleRemove = async (id: number) => {
		try {
			await lineService.delete(id);
			setLines((prev) => prev.filter((l) => l.id !== id));
		} catch (err) {
			console.error(err);
		}
	};

	const handleIncrease = async (line: Line_order) => {
		try {
			const price = line.product?.price ?? 0;

			await lineService.incrementQty(line.id, 1, price);

			setLines((prev) =>
				prev.map((l) =>
					l.id === line.id
						? { ...l, qty: l.qty + 1, total: l.total + price }
						: l,
				),
			);
		} catch (err) {
			console.error(err);
		}
	};

	const handleDecrease = async (line: Line_order) => {
		try {
			const price = line.product?.price ?? 0;

			if (line.qty <= 1) {
				await handleRemove(line.id);
				return;
			}

			await lineService.incrementQty(line.id, -1, -price);

			setLines((prev) =>
				prev.map((l) =>
					l.id === line.id
						? { ...l, qty: l.qty - 1, total: l.total - price }
						: l,
				),
			);
		} catch (err) {
			console.error(err);
		}
	};

	const totalPanier = lines.reduce((sum, l) => sum + Number(l.total ?? 0), 0);

	if (loading) return <p>Chargement du panier...</p>;

	return (
		<section className={styles.section}>
			<h1 className={styles.title}>Mon Panier</h1>

			{lines.length === 0 ? (
				<p>Votre panier est vide</p>
			) : (
				lines.map((line) => (
					<div key={line.id} className={styles.card}>
						<div className={styles.imageWrapper}>
							<img
								src={
									line.product?.image
										? line.product.image.startsWith("http")
											? line.product.image
											: `/images/${line.product.image}`
										: "/images/default.png"
								}
								alt={line.product?.name ?? "produit"}
							/>
						</div>

						<div className={styles.content}>
							<h2>{line.product?.name}</h2>

							<p>
								Catégorie : {line.product?.category?.name ?? "Non renseignée"}
							</p>

							<p>{line.product?.description}</p>

							<p>{line.product?.price} €</p>

							<div className={styles.qtyControls}>
								<button type="button" onClick={() => handleDecrease(line)}>
									-
								</button>
								<span>{line.qty}</span>
								<button type="button" onClick={() => handleIncrease(line)}>
									+
								</button>
							</div>

							<p>Total : {line.total} €</p>

							<button type="button" onClick={() => handleRemove(line.id)}>
								Supprimer
							</button>
						</div>
					</div>
				))
			)}

			<div className={styles.totalBox}>
				<h2>Total panier : {totalPanier.toFixed(2)} €</h2>
			</div>

			<button
				type="button"
				className={styles.checkoutButton}
				onClick={() => navigate("/checkout")}
			>
				Passer à la commande
			</button>
		</section>
	);
}
