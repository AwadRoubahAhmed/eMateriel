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

		const ordersService = new ApiOrdersService();
		const lineService = new ApiLineOrderService();

		let order = null;

		// 1. si user connecté → chercher son dernier order
		if (userId) {
			const res = await ordersService.selectAll();

			order = res.data
				?.filter((o) => o.user_id === userId)
				.sort((a, b) => b.id - a.id)[0];
		}

		// 2. si pas d'order → créer (comme tu fais déjà)
		if (!order) {
			const created = await ordersService.create({
				user_id: userId ?? null,
				total: 0,
			});

			order = created.data;
		}

		// 3. ajouter produit
		await lineService.create({
			order_id: order.id,
			product_id: product.id,
			qty: 1,
			total: product.price,
		});

		navigate("/panier");
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
