"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { Category } from "../../../../models/category";
import type { Product } from "../../../../models/product";
import { api, errorMessage } from "../../../services/api";
import { productImage } from "../../../utils/format";
import { useAdminData } from "../useAdminData";

type ProductValues = {
	name: string;
	price: number;
	description: string;
	stock: number;
	category_id: number;
	image: FileList;
};

// Formulaire commun à l'ajout et à la modification d'un produit
export default function ProductForm({ product }: { product?: Product }) {
	const navigate = useNavigate();
	const categories = useAdminData<Category[]>("/api/category").data ?? [];
	const [error, setError] = useState("");
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ProductValues>();

	useEffect(() => {
		if (product && categories.length) {
			reset({
				name: product.name,
				price: product.price,
				description: product.description ?? "",
				stock: product.stock,
				category_id: product.category_id ?? undefined,
			});
		}
	}, [product, categories.length, reset]);

	const onSubmit = async (values: ProductValues) => {
		setError("");
		const form = new FormData();
		form.set("name", values.name);
		form.set("price", String(values.price));
		form.set("description", values.description ?? "");
		form.set("stock", String(values.stock));
		form.set("category_id", String(values.category_id));
		if (values.image?.[0]) form.set("image", values.image[0]);

		const result = await api(product ? `/api/product/${product.id}` : "/api/product", {
			method: product ? "PUT" : "POST",
			body: form,
		});
		if (![200, 201].includes(result.status)) return setError(errorMessage(result));
		navigate("/admin/products");
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate style={{ maxWidth: 600 }}>
			{error && <p className="form-message error" role="alert">{error}</p>}

			<div className="field">
				<label htmlFor="p-name">Nom</label>
				<input id="p-name" aria-invalid={!!errors.name} {...register("name", { required: "Nom obligatoire", minLength: { value: 2, message: "2 caractères minimum" }, maxLength: { value: 100, message: "100 caractères maximum" } })} />
				{errors.name && <span className="field-error">{errors.name.message}</span>}
			</div>
			<div className="field">
				<label htmlFor="p-price">Prix TTC (€)</label>
				<input id="p-price" type="number" step="0.01" min="0.01" aria-invalid={!!errors.price} {...register("price", { required: "Prix obligatoire", min: { value: 0.01, message: "Prix positif" } })} />
				{errors.price && <span className="field-error">{errors.price.message}</span>}
			</div>
			<div className="field">
				<label htmlFor="p-stock">Stock</label>
				<input id="p-stock" type="number" min="0" step="1" aria-invalid={!!errors.stock} {...register("stock", { required: "Stock obligatoire", min: { value: 0, message: "0 minimum" } })} />
				{errors.stock && <span className="field-error">{errors.stock.message}</span>}
			</div>
			<div className="field">
				<label htmlFor="p-category">Catégorie</label>
				<select id="p-category" aria-invalid={!!errors.category_id} {...register("category_id", { required: "Catégorie obligatoire" })}>
					<option value="">Choisir une catégorie</option>
					{categories.map((c) => (
						<option key={c.id} value={c.id}>
							{c.name}
						</option>
					))}
				</select>
				{errors.category_id && <span className="field-error">{errors.category_id.message}</span>}
			</div>
			<div className="field">
				<label htmlFor="p-description">Description</label>
				<textarea id="p-description" {...register("description", { maxLength: { value: 5000, message: "5 000 caractères maximum" } })} />
				{errors.description && <span className="field-error">{errors.description.message}</span>}
			</div>
			<div className="field">
				<label htmlFor="p-image">Image (JPEG, PNG ou WebP, 5 Mo max){product ? ", laisser vide pour garder l'actuelle" : ""}</label>
				{product && <img src={productImage(product.image)} alt="Image actuelle" width="96" height="96" style={{ objectFit: "contain" }} />}
				<input id="p-image" type="file" accept="image/jpeg,image/png,image/webp" aria-invalid={!!errors.image} {...register("image", { validate: (files) => !!product || files?.length > 0 || "Image obligatoire" })} />
				{errors.image && <span className="field-error">{errors.image.message}</span>}
			</div>

			<div style={{ display: "flex", gap: "0.75rem" }}>
				<button type="submit" className="btn" disabled={isSubmitting}>
					{product ? "Enregistrer" : "Ajouter le produit"}
				</button>
				<button type="button" className="btn btn-secondary" onClick={() => navigate("/admin/products")}>
					Annuler
				</button>
			</div>
		</form>
	);
}
