"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import type { Category } from "../../../../models/category";
import { api, errorMessage } from "../../../services/api";
import { useAdminData } from "../useAdminData";

export default function AdminCategories() {
	const { data: categories, error, setError, reload } = useAdminData<Category[]>("/api/category");
	const [notice, setNotice] = useState("");

	const remove = async (category: Category) => {
		if (!window.confirm(`Supprimer la catégorie « ${category.name} » ? Ses produits resteront, sans catégorie.`)) return;
		const result = await api(`/api/category/${category.id}`, { method: "DELETE" });
		if (result.status !== 200) return setError(errorMessage(result));
		setNotice(`« ${category.name} » supprimée`);
		reload();
	};

	return (
		<>
			<h1>Catégories</h1>
			<p style={{ marginBottom: "1rem" }}>
				<Link to="/admin/category/form" className="btn">
					Ajouter une catégorie
				</Link>
			</p>
			<div role="status" aria-live="polite">
				{notice && <p className="form-message success">{notice}</p>}
			</div>
			{error && <p className="form-message error" role="alert">{error}</p>}
			{!categories ? (
				<p>Chargement…</p>
			) : (
				<div className="table-wrap">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Nom</th>
								<th scope="col">Description</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{categories.map((category) => (
								<tr key={category.id}>
									<td>{category.name}</td>
									<td>{(category.description ?? "").slice(0, 90)}</td>
									<td>
										<div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
											<Link to={`/admin/category/update/${category.id}`} className="btn btn-secondary btn-small">
												Modifier
											</Link>
											<button type="button" className="btn btn-danger btn-small" onClick={() => remove(category)}>
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
