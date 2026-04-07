"use client";

import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../../../models/product";
import type { ApiResponse } from "../../../models/api_response";
import type { AdminProductFormContentProps } from "../../../models/props/admin_product_form_content_props";
import ApiProductService from "../../../services/api_product_service";
import SecurityService from "../../../services/security_service";
import Seo from "../../Seo";
import Title from "../../title/Title";
import styles from "./adminForm.module.css";

const AdminProductFormContent = ({
	categories,
	product,
}: AdminProductFormContentProps) => {
	const security = new SecurityService();
	const token = security.getToken();

	const idId = useId();
	const nameId = useId();
	const imageId = useId();
	const priceId = useId();
	const descriptionId = useId();
	const stockId = useId();
	const categoryId = useId();

	const navigate = useNavigate();
	const [_message, setMessage] = useState<string>("");

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Product>();

	useEffect(() => {
		if (product) {
			reset({
				id: product.id,
				name: product.name,
				price: product.price,
				description: product.description,
				stock: product.stock,
				category_id: product.category_id,
			});
		}
	}, [product, reset]);

	const submitForm = async (data: Product) => {
		const formData = new FormData();
		formData.set("id", data.id as unknown as string);
		formData.set("name", data.name);
		if (data.image && data.image.length > 0)
			formData.set("image", data.image[0]);
		formData.set("price", data.price as unknown as string);
		formData.set("description", data.description);
		formData.set("stock", data.stock as unknown as string);
		formData.set("category_id", data.category_id as unknown as string);

		let process: ApiResponse<null>;
		console.log("JWT token:", token);

		console.log("JWT token:", token);
		console.log("Product ID:", product?.id);

		if (product) {
			process = await new ApiProductService().update(
				product.id,
				formData,
				token ?? undefined,
			);
		} else {
			process = await new ApiProductService().insert(
				formData,
				token ?? undefined,
			);
		}

		if ([200, 201].includes(process.status)) {
			navigate("/admin/products");
		} else if (process.status === 400) {
			setMessage(process.message as unknown as string);
		}
	};

	return (
		<div className={styles.container}>
			<Seo
				title="eMatériel - Panier"
				description="La page Panier"
				url="/panier"
			/>
			<Title title="Formulaire d'ajout de produit" />

			<form
				className={styles.form}
				encType="multipart/form-data"
				onSubmit={handleSubmit(submitForm)}
			>
				{/* Name */}
				<div className={styles.formGroup}>
					<label htmlFor={nameId} className={styles.label}>
						Nom :
					</label>
					<input
						type="text"
						id={nameId}
						{...register("name", {
							required: "Le nom est obligatoire",
							minLength: {
								value: 5,
								message: "Le nom doit comporter 5 caractères au minimum",
							},
							maxLength: {
								value: 50,
								message: "Le nom doit comporter 50 caractères au maximum",
							},
						})}
						className={styles.input}
					/>
					<small role="alert" className={styles.errorMessage}>
						{errors.name?.message}
					</small>
				</div>

				{/* Image */}
				<div className={styles.formGroup}>
					<label htmlFor={imageId} className={styles.label}>
						Image :
					</label>
					<input
						type="file"
						id={imageId}
						{...register("image", {
							required: "Le champs image est obligatoire",
						})}
						className={styles.fileInput}
					/>
					<small className={styles.errorMessage}>{errors.image?.message}</small>
				</div>

				{/* Price */}
				<div className={styles.formGroup}>
					<label htmlFor={priceId} className={styles.label}>
						Price :
					</label>
					<input
						type="number"
						id={priceId}
						{...register("price", {
							required: "Le champs price est obligatoire",
						})}
						className={styles.input}
					/>
					<small className={styles.errorMessage}>{errors.price?.message}</small>
				</div>

				{/* Description */}
				<div className={styles.formGroup}>
					<label htmlFor={descriptionId} className={styles.label}>
						Description :
					</label>
					<textarea
						id={descriptionId}
						{...register("description", {
							required: "Le champs description est obligatoire",
						})}
						className={styles.textarea}
					/>
					<small className={styles.errorMessage}>
						{errors.description?.message}
					</small>
				</div>

				{/* Stock */}
				<div className={styles.formGroup}>
					<label htmlFor={stockId} className={styles.label}>
						Stock :
					</label>
					<input
						type="number"
						id={stockId}
						{...register("stock", {
							required: "Le champs stock est obligatoire",
						})}
						className={styles.input}
					/>
					<small className={styles.errorMessage}>{errors.stock?.message}</small>
				</div>

				{/* Category */}
				<div className={styles.formGroup}>
					<label htmlFor={categoryId} className={styles.label}>
						Catégorie :
					</label>
					<select
						id={categoryId}
						{...register("category_id", {
							required: "La catégorie est obligatoire",
						})}
						className={styles.select}
					>
						<option value="">Sélectionner une catégorie</option>
						{categories.map((category) => (
							<option value={category.id} key={category.id}>
								{category.name}
							</option>
						))}
					</select>
					<small className={styles.errorMessage}>
						{errors.category_id?.message}
					</small>
				</div>

				{/* Hidden ID & submit */}
				<div className={styles.formGroup}>
					<input type="hidden" id={idId} {...register("id")} />
					<button type="submit" className={styles.submitButton}>
						{product ? "Modifier le produit" : "Ajouter un produit"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AdminProductFormContent;
