"use client";

import { useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Orders } from "../../../models/orders";
import type { Product } from "../../../models/product";
import Seo from "../../components/Seo";
import { useAuth } from "../../context/AuthContext";
import ApiLineOrderService from "../../services/api_line_order_service";
import ApiOrdersService from "../../services/api_orders_service";
import ApiProductService from "../../services/api_product_service";
import styles from "./ProductDetail.module.css";

export default function ProductDetail() {
	const { id } = useParams<{ id: string }>();
	const { user } = useAuth();

	const navigate = useNavigate();

	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const result = await new ApiProductService().selectOne(Number(id));
				setProduct(result.data ?? null);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	if (loading) return <p>Chargement du produit...</p>;
	if (!product) return <p>Produit introuvable</p>;

	const handleAddToCart = async () => {
		if (!product) return;

		const ordersService = new ApiOrdersService();
		const lineService = new ApiLineOrderService();

		try {
			const userId = user?.id ?? null;

			let order: Orders | null = null;

			// 1. récupérer panier existant
			if (userId) {
				const res = await ordersService.selectUserCart(userId);
				order = res.data ?? null;
			} else {
				const res = await ordersService.selectAll();
				order = res.data?.find((o) => o.user_id === null) ?? null;
			}

			// 2. créer panier si besoin
			if (!order) {
				const created = await ordersService.create({
					name: "Panier",
					image: "cart.png",
					user_id: userId,
					payment_method_id: null,
					total: 0,
				});

				const orderId = created.data?.id;
				if (!orderId) return;

				const fullOrder = await ordersService.selectOne(orderId);
				order = fullOrder.data ?? null;
			}

			if (!order) return;

			const price = product.price;

			// 3. CHECK PRODUIT DANS PANIER (FIX IMPORTANT)
			const existing = await lineService.findByOrderAndProduct(
				order.id,
				product.id,
			);

			const existingLine = existing.status === 200 ? existing.data : null;

			// 4. update ou create
			if (existingLine) {
				await lineService.incrementQty(existingLine.id, 1, price);
			} else {
				await lineService.create({
					order_id: order.id,
					product_id: product.id,
					qty: 1,
					total: price,
				});
			}

			navigate("/panier");
		} catch (error) {
			console.error("ADD TO CART ERROR:", error);
		}
	};

	return (
		<>
			<Seo
				title={`eMatériel - ${product.name}`}
				description="Détail du produit"
				url={`/products/${id}`}
			/>

			<section className={styles.section}>
				<Link to="/products" className={styles.backButton}>
					<IoArrowBackCircleOutline />
					Retour
				</Link>

				<div className={styles.container}>
					<div className={styles.imageWrapper}>
						<img src={`/images/${product.image}`} alt={product.name} />
					</div>

					<div className={styles.content}>
						<h1 className={styles.title}>{product.name}</h1>

						<span className={styles.category}>
							Catégorie : {product.category?.name ?? "Non renseignée"}
						</span>

						<p className={styles.description}>{product.description}</p>

						<div className={styles.meta}>
							<span className={styles.price}>{product.price} €</span>
							<span className={styles.stock}>
								{product.stock > 0
									? `En stock : ${product.stock}`
									: "Rupture de stock"}
							</span>
						</div>

						<button
							type="button"
							className={styles.buyButton}
							onClick={handleAddToCart}
						>
							Ajouter au panier
						</button>
					</div>
				</div>
			</section>
		</>
	);
}
