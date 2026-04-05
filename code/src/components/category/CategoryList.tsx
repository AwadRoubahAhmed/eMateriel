"use client";

import { useEffect, useState } from "react";
import type { Category } from "../../../models/category";
import styles from "../../pages/category/Category.module.css";
import ApiCategoryService from "../../services/api_category_service";
import CategoryItem from "./CategoryItem";

export default function CategoryList() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCategories = async () => {
			const categoryService = new ApiCategoryService();
			const res = await categoryService.selectAll();

			setCategories(res?.data ?? []);

			setLoading(false);
		};

		fetchCategories();
	}, []);

	if (loading) return <p className={styles.loading}>Chargement...</p>;

	return (
		<div className={styles.grid}>
			{categories.map((cat) => (
				<CategoryItem key={cat.id} data={cat} />
			))}
		</div>
	);
}
