"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import RequireAuth from "../../components/auth/RequireAuth";
import Seo from "../../components/Seo";
import { useCart } from "../../context/CartContext";
import { api, errorMessage } from "../../services/api";
import { cartTotal } from "../../services/cart_service";
import { formatPrice } from "../../utils/format";
import styles from "./Checkout.module.css";

type ShippingForm = { name: string; address: string; zip: string; city: string; phone: string };

function CheckoutForm() {
	const items = useCart();
	const [error, setError] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ShippingForm>();

	if (items.length === 0) {
		return (
			<p>
				Votre panier est vide. <Link to="/products">Voir les produits</Link>
			</p>
		);
	}

	const onSubmit = async (shipping: ShippingForm) => {
		setError("");
		const result = await api<{ id: number; checkout_url: string }>("/api/orders", {
			method: "POST",
			// seuls les identifiants et quantités partent : le serveur relit les prix
			body: { items: items.map(({ product_id, qty }) => ({ product_id, qty })), shipping },
		});
		if (result.status !== 201 || !result.data) return setError(errorMessage(result));
		// page de paiement sécurisée Stripe ; le panier est vidé au retour si le paiement est validé
		window.location.assign(result.data.checkout_url);
	};

	return (
		<div className={styles.layout}>
			<form onSubmit={handleSubmit(onSubmit)} noValidate aria-describedby="checkout-error">
				<h2 className={styles.subtitle}>Adresse de livraison</h2>
				{error && (
					<p id="checkout-error" className="form-message error" role="alert">
						{error}
					</p>
				)}

				<div className="field">
					<label htmlFor="name">Nom et prénom</label>
					<input id="name" autoComplete="name" aria-invalid={!!errors.name} {...register("name", { required: "Nom obligatoire", minLength: { value: 2, message: "Nom trop court" } })} />
					{errors.name && <span className="field-error">{errors.name.message}</span>}
				</div>
				<div className="field">
					<label htmlFor="address">Adresse</label>
					<input id="address" autoComplete="street-address" aria-invalid={!!errors.address} {...register("address", { required: "Adresse obligatoire", minLength: { value: 5, message: "Adresse trop courte" } })} />
					{errors.address && <span className="field-error">{errors.address.message}</span>}
				</div>
				<div className={styles.row}>
					<div className="field">
						<label htmlFor="zip">Code postal</label>
						<input id="zip" inputMode="numeric" autoComplete="postal-code" aria-invalid={!!errors.zip} {...register("zip", { required: "Code postal obligatoire", pattern: { value: /^\d{5}$/, message: "5 chiffres" } })} />
						{errors.zip && <span className="field-error">{errors.zip.message}</span>}
					</div>
					<div className="field">
						<label htmlFor="city">Ville</label>
						<input id="city" autoComplete="address-level2" aria-invalid={!!errors.city} {...register("city", { required: "Ville obligatoire" })} />
						{errors.city && <span className="field-error">{errors.city.message}</span>}
					</div>
				</div>
				<div className="field">
					<label htmlFor="phone">Téléphone (pour le livreur)</label>
					<input id="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} {...register("phone", { required: "Téléphone obligatoire", pattern: { value: /^(\+33|0)[1-9](\s?\d{2}){4}$/, message: "Numéro français, ex. 06 12 34 56 78" } })} />
					{errors.phone && <span className="field-error">{errors.phone.message}</span>}
				</div>

				<p className={styles.legal}>
					En cliquant sur « Payer », vous acceptez nos <Link to="/cgv">conditions générales de vente</Link>.
					Commande avec obligation de paiement.
				</p>
				<button type="submit" className="btn" disabled={isSubmitting}>
					{isSubmitting ? "Redirection vers le paiement…" : `Payer ${formatPrice(cartTotal(items))}`}
				</button>
			</form>

			<aside className={styles.summary} aria-labelledby="summary-title">
				<h2 id="summary-title" className={styles.subtitle}>
					Récapitulatif
				</h2>
				<ul>
					{items.map((item) => (
						<li key={item.product_id} className={styles.line}>
							<span>
								{item.name} × {item.qty}
							</span>
							<span>{formatPrice(item.price * item.qty)}</span>
						</li>
					))}
				</ul>
				<p className={styles.total}>
					<span>Total TTC</span>
					<strong>{formatPrice(cartTotal(items))}</strong>
				</p>
				<p className={styles.note}>Paiement par carte sur la page sécurisée de Stripe.</p>
			</aside>
		</div>
	);
}

export default function Checkout() {
	return (
		<section className="page">
			<Seo title="Commande" description="Finaliser votre commande." path="/commande" noindex />
			<h1>Finaliser ma commande</h1>
			<RequireAuth>
				<CheckoutForm />
			</RequireAuth>
		</section>
	);
}
