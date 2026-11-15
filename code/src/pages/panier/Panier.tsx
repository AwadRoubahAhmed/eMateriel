"use client";

import { Link } from "react-router-dom";
import Seo from "../../components/Seo";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { cartTotal, MAX_QTY, removeFromCart, setQty } from "../../services/cart_service";
import { formatPrice, productImage } from "../../utils/format";
import styles from "./Panier.module.css";

export default function Panier() {
	const items = useCart();
	const { session } = useAuth();

	return (
		<section className={`page ${styles.section}`}>
			<Seo title="Mon panier" description="Votre panier eMatériel." path="/panier" noindex />
			<h1 className={styles.title}>Mon panier</h1>

			{items.length === 0 ? (
				<p>
					Votre panier est vide. <Link to="/products">Découvrir nos produits</Link>
				</p>
			) : (
				<>
					<ul aria-label="Articles du panier">
						{items.map((item) => (
							<li key={item.product_id} className={styles.card}>
								<div className={styles.imageWrapper}>
									<img src={productImage(item.image)} alt="" width="120" height="120" />
								</div>
								<div className={styles.content}>
									<h2>
										<Link to={`/products/${item.product_id}`}>{item.name}</Link>
									</h2>
									<p>{formatPrice(item.price)} l'unité</p>

									<div className={styles.qtyControls}>
										<button
											type="button"
											className="btn btn-secondary btn-small"
											aria-label={`Retirer un ${item.name}`}
											onClick={() => setQty(item.product_id, item.qty - 1)}
										>
											−
										</button>
										<span aria-live="polite">Quantité : {item.qty}</span>
										<button
											type="button"
											className="btn btn-secondary btn-small"
											aria-label={`Ajouter un ${item.name}`}
											disabled={item.qty >= Math.min(item.stock, MAX_QTY)}
											onClick={() => setQty(item.product_id, item.qty + 1)}
										>
											+
										</button>
									</div>

									<p>
										Sous-total : <strong>{formatPrice(item.price * item.qty)}</strong>
									</p>
									<button
										type="button"
										className="btn btn-secondary btn-small"
										onClick={() => removeFromCart(item.product_id)}
									>
										Supprimer
									</button>
								</div>
							</li>
						))}
					</ul>

					<div className={styles.totalBox}>
						<p>
							Total : <strong>{formatPrice(cartTotal(items))}</strong> TTC
						</p>
						<p className={styles.note}>Le total définitif est confirmé à l'étape de paiement.</p>
						<Link to={session ? "/commande" : "/auth?next=/commande"} className="btn">
							{session ? "Passer la commande" : "Se connecter pour commander"}
						</Link>
					</div>
				</>
			)}
		</section>
	);
}
