"use client";

import { useParams } from "react-router-dom";
import type { Product } from "../../../../models/product";
import { useAdminData } from "../useAdminData";
import ProductForm from "./ProductForm";

export default function AdminProductUpdate() {
	const { id } = useParams();
	const { data: product, error } = useAdminData<Product>(`/api/product/${id}`);

	return (
		<>
			<h1>Modifier le produit</h1>
			{error && <p className="form-message error" role="alert">{error}</p>}
			{product ? <ProductForm product={product} /> : !error && <p>Chargement…</p>}
		</>
	);
}
