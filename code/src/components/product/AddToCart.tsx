"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { addToCart, type CartItem, MAX_QTY } from "../../services/cart_service";

export default function AddToCart({ product }: { product: Omit<CartItem, "qty"> }) {
	const cart = useCart();
	const [added, setAdded] = useState(false);
	const inCart = cart.find((i) => i.product_id === product.product_id)?.qty ?? 0;
	const max = Math.min(product.stock, MAX_QTY);

	if (product.stock <= 0) {
		return (
			<button type="button" className="btn" disabled>
				Indisponible
			</button>
		);
	}

	return (
		<div>
			<button
				type="button"
				className="btn"
				disabled={inCart >= max}
				onClick={() => {
					addToCart(product);
					setAdded(true);
				}}
			>
				{inCart >= max ? "Quantité maximale atteinte" : "Ajouter au panier"}
			</button>
			<p role="status" style={{ marginTop: "0.75rem", minHeight: "1.5em" }}>
				{added && (
					<>
						Ajouté au panier ({inCart}).{" "}
						<Link to="/panier" style={{ color: "var(--primary)" }}>
							Voir le panier
						</Link>
					</>
				)}
			</p>
		</div>
	);
}
