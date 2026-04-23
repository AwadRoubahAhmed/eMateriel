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
	const navigate = useNavigate();

	const { user } = useAuth();
	const userId = user?.id;

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

	// const handleAddToCart = async () => {
	// 	if (!userId) {
	// 		navigate("/auth");
	// 		return;
	// 	}

	// 	try {
	// 		const ordersService = new ApiOrdersService();
	// 		const lineService = new ApiLineOrderService();

	// 		// 1️⃣ récupérer toutes les commandes
	// 		const ordersRes = await ordersService.selectAll();

	// 		// 2️⃣ trouver la commande de l'utilisateur
	// 		let order = ordersRes.data?.find((o) => o.user_id === userId);

	// 		// 3️⃣ si pas de commande → création
	// 		if (!order) {
	// 			const created = await ordersService.create({
	// 				name: "Panier",
	// 				description: "Panier utilisateur",
	// 				total: 0,
	// 				user_id: userId,
	// 			});

	// 			if (!created.data) return;

	// 			order = created.data;
	// 		}

	// 		// 4️⃣ ajouter produit dans line_order
	// 		await lineService.create({
	// 			order_id: order.id,
	// 			product_id: product.id,
	// 			qty: 1,
	// 			total: product.price,
	// 		});

	// 		// 5️⃣ redirect panier
	// 		navigate("/panier");
	// 	} catch (err) {
	// 		console.error("Erreur ajout panier:", err);
	// 	}
	// };

	const handleAddToCart = async () => {
		if (!product) return;

		if (!userId) {
			navigate("/auth");
			return;
		}

		const ordersService = new ApiOrdersService();
		const lineService = new ApiLineOrderService();

		try {
			// 1. récupérer panier utilisateur
			const res = await ordersService.selectUserCart(userId);
			let order: Orders | null = res.data ?? null;

			// 2. créer panier si inexistant
			if (!order) {
				const created = await ordersService.create({
					user_id: userId,
					total: 0,
				});

				order = created.data ?? null;
			}

			// 3. sécurité stricte TS
			if (!order) return;

			// 4. vérifier si produit déjà dans panier
			const existingLine = await lineService.findByOrderAndProduct(
				order.id,
				product.id,
			);

			// 5. update ou create
			if (existingLine?.data) {
				await lineService.incrementQty(existingLine.data.id, 1, product.price);
			} else {
				await lineService.create({
					order_id: order.id,
					product_id: product.id,
					qty: 1,
					total: product.price,
				});
			}

			// 6. redirect
			navigate("/panier");
		} catch (error) {
			console.error("Erreur add to cart:", error);
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
