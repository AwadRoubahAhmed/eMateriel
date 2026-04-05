"use client";

import { useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Product } from "../../../models/product";
import Seo from "../../components/Seo";
import { useAuth } from "../../context/AuthContext";
import ApiLineOrderService from "../../services/api_line_order_service";
import ApiOrdersService from "../../services/api_orders_service";
import ApiProductService from "../../services/api_product_service";
import styles from "./ProductDetail.module.css";

export default function ProductDetail() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { userId } = useAuth(); // Utilisateur connecté
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);

	// 🔹 Charger le produit
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

	// 🔹 Ajouter au panier
	const handleAddToCart = async () => {
		if (!userId) {
			// Redirige vers la page login si non connecté
			navigate("/auth");
			return;
		}

		try {
			const ordersService = new ApiOrdersService();
			const lineOrderService = new ApiLineOrderService();

			// Récupérer la commande en cours de l'utilisateur
			const orders = await ordersService.selectAll();
			let order = orders.data?.find((o) => o.user_id === userId);

			// Créer une nouvelle commande si aucune existante
			if (!order) {
				const createdOrder = await ordersService.create({
					name: "Commande en cours",
					total: 0,
					description: "",
					user_id: userId,
				});

				if (!createdOrder.data) {
					console.error("Impossible de créer la commande");
					return;
				}
				order = createdOrder.data;
			}

			// Ajouter le produit à la commande
			await lineOrderService.create({
				order_id: order.id,
				product_id: product.id,
				qty: 1,
				total: product.price,
			});

			// Aller vers le panier
			navigate("/panier");
		} catch (err) {
			console.error("Erreur lors de l'ajout au panier", err);
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
