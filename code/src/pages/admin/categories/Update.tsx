"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import type { Category } from "../../../../models/category";
import { api, errorMessage } from "../../../services/api";

type CategoryValues = { name: string; description: string };

// Ajout (/admin/category/form) et modification (/admin/category/update/:id)
export default function AdminCategoryForm() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<CategoryValues>();

	useEffect(() => {
		if (!id) return;
		api<Category>(`/api/category/${id}`).then((result) =>
			result.data ? reset({ name: result.data.name, description: result.data.description ?? "" }) : setError(errorMessage(result)),
		);
	}, [id, reset]);

	const onSubmit = async (values: CategoryValues) => {
		const result = await api(id ? `/api/category/${id}` : "/api/category", {
			method: id ? "PUT" : "POST",
			body: values,
		});
		if (![200, 201].includes(result.status)) return setError(errorMessage(result));
		navigate("/admin/categories");
	};

	return (
		<>
			<h1>{id ? "Modifier la catégorie" : "Ajouter une catégorie"}</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate style={{ maxWidth: 600 }}>
				{error && <p className="form-message error" role="alert">{error}</p>}
				<div className="field">
					<label htmlFor="c-name">Nom</label>
					<input id="c-name" aria-invalid={!!errors.name} {...register("name", { required: "Nom obligatoire", minLength: { value: 2, message: "2 caractères minimum" }, maxLength: { value: 50, message: "50 caractères maximum" } })} />
					{errors.name && <span className="field-error">{errors.name.message}</span>}
				</div>
				<div className="field">
					<label htmlFor="c-description">Description</label>
					<textarea id="c-description" {...register("description", { maxLength: { value: 2000, message: "2 000 caractères maximum" } })} />
					{errors.description && <span className="field-error">{errors.description.message}</span>}
				</div>
				<div style={{ display: "flex", gap: "0.75rem" }}>
					<button type="submit" className="btn" disabled={isSubmitting}>
						Enregistrer
					</button>
					<button type="button" className="btn btn-secondary" onClick={() => navigate("/admin/categories")}>
						Annuler
					</button>
				</div>
			</form>
		</>
	);
}
