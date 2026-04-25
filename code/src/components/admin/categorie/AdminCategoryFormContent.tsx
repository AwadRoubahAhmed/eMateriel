"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { Category } from "../../../../models/category";
import ApiCategoryService from "../../../services/api_category_service";
import SecurityService from "../../../services/security_service";
import styles from "./adminCategoryForm.module.css";

type CategoryForm = Pick<Category, "id" | "name" | "description">;

const AdminCategoryFormContent = ({ category }: { category?: Category }) => {
	const { register, handleSubmit, reset } = useForm<CategoryForm>();
	const navigate = useNavigate();

	useEffect(() => {
		if (category) {
			reset({
				id: category.id,
				name: category.name,
				description: category.description,
			});
		}
	}, [category, reset]);

	const submitForm = async (data: CategoryForm) => {
		const token = new SecurityService().getToken();

		let res;

		if (data.id) {
			res = await new ApiCategoryService().update(
				data.id,
				{
					name: data.name,
					description: data.description,
				},
				token ?? undefined,
			);
		} else {
			res = await new ApiCategoryService().insert(
				{
					name: data.name,
					description: data.description,
				},
				token ?? undefined,
			);
		}

		if ([200, 201].includes(res.status)) {
			navigate("/admin/categories");
		}
	};
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>
				{category ? "Modifier catégorie" : "Ajouter catégorie"}
			</h2>

			<form className={styles.form} onSubmit={handleSubmit(submitForm)}>
				<div className={styles.formGroup}>
					<label htmlFor="name" className={styles.label}>
						Nom
					</label>
					<input
						className={styles.input}
						placeholder="Nom"
						{...register("name", { required: true })}
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="description" className={styles.label}>
						Description
					</label>
					<textarea
						className={styles.textarea}
						placeholder="Description"
						{...register("description", { required: true })}
					/>
				</div>

				<input type="hidden" {...register("id")} />

				<button className={styles.submitButton} type="submit">
					{category ? "Modifier" : "Ajouter"}
				</button>
			</form>
		</div>
	);
};

export default AdminCategoryFormContent;
