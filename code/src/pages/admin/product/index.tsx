"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../../../models/product";
import { api, errorMessage } from "../../../services/api";
import { formatPrice, productImage } from "../../../utils/format";
import { useAdminData } from "../useAdminData";

function StockCell({ product, onSaved }: { product: Product; onSaved: (message: string) => void }) {
	const [stock, setStock] = useState(String(product.stock));
	const changed = Number(stock) !== product.stock;

	const save = async () => {
		const result = await api(`/api/product/${product.id}/stock`, { method: "PATCH", body: { stock: Number(stock) } });
		onSaved(result.status === 200 ? `Stock de « ${product.name} » mis à jour` : errorMessage(result));
	};

	return (
		<div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
			<label className="sr-only" htmlFor={`stock-${product.id}`}>
				Stock de {product.name}
			</label>
			<input
				id={`stock-${product.id}`}
				type="number"
				min="0"
				value={stock}
				onChange={(e) => setStock(e.target.value)}
				style={{ width: "5rem", minHeight: "36px", padding: "0.25rem 0.5rem", border: "1px solid #6b7280", borderRadius: "6px" }}
			/>
			{changed && (
				<button type="button" className="btn btn-small" onClick={save}>
					Enregistrer
				</button>
			)}
		</div>
	);
}

export default function AdminProducts() {
	const { data: products, error, setError, reload } = useAdminData<Product[]>("/api/product");
	const [notice, setNotice] = useState("");

	const remove = async (product: Product) => {
		if (!window.confirm(`Supprimer définitivement « ${product.name} » ?`)) return;
		const result = await api(`/api/product/${product.id}`, { method: "DELETE" });
		if (result.status !== 200) return setError(errorMessage(result));
		setNotice(`« ${product.name} » supprimé`);
		reload();
	};

	return (
		<>
			<h1>Produits et stock</h1>
			<p style={{ marginBottom: "1rem" }}>
				<Link to="/admin/product/form" className="btn">
					Ajouter un produit
				</Link>
			</p>
			<div role="status" aria-live="polite">
				{notice && <p className="form-message success">{notice}</p>}
			</div>
			{error && <p className="form-message error" role="alert">{error}</p>}

			{!products ? (
				<p>Chargement…</p>
			) : (
				<div className="table-wrap">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Image</th>
								<th scope="col">Produit</th>
								<th scope="col">Catégorie</th>
								<th scope="col">Prix</th>
								<th scope="col">Stock</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product.id}>
									<td>
										<img src={productImage(product.image)} alt="" width="48" height="48" style={{ objectFit: "contain" }} loading="lazy" />
									</td>
									<td>{product.name}</td>
									<td>{product.category?.name ?? "Aucune"}</td>
									<td>{formatPrice(product.price)}</td>
									<td>
										<StockCell
											product={product}
											onSaved={(message) => {
												setNotice(message);
												reload();
											}}
										/>
									</td>
									<td>
										<div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
											<Link to={`/admin/product/update/${product.id}`} className="btn btn-secondary btn-small">
												Modifier
											</Link>
											<button type="button" className="btn btn-danger btn-small" onClick={() => remove(product)}>
												Supprimer
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}
