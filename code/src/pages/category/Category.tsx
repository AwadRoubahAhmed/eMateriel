"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../../../models/product";
import ProductListItem from "../../components/product/ProductListItem";
import Seo from "../../components/Seo";
import ApiProductService from "../../services/api_product_service";
import styles from "./Category.module.css";
import ApiCategoryService from "../../services/api_category_service";
import Title from "../../components/title/Title";

export default function Category() {
	const { id } = useParams();
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [categoryName, setCategoryName] = useState("");

	// useEffect(() => {
	// 	if (!id) return;

	// 	const fetchProducts = async () => {
	// 		const productService = new ApiProductService();
	// 		const res = await productService.selectAll();

	// 		const filtered =
	// 			res?.data?.filter(
	// 				(product) => product.category_id.toString() === id,
	// 			) ?? [];

	// 		setProducts(filtered);
	// 		setLoading(false);
	// 	};

	// 	fetchProducts();
	// }, [id]);

	useEffect(() => {
		if (!id) return;

		const fetchData = async () => {
			const productService = new ApiProductService();
			const categoryService = new ApiCategoryService();

			const resProducts = await productService.selectAll();
			const resCategory = await categoryService.selectOne(Number(id));

			const filtered =
				resProducts?.data?.filter(
					(product) => product.category_id.toString() === id,
				) ?? [];

			setProducts(filtered);
			setCategoryName(resCategory?.data?.name ?? "");
			setLoading(false);
		};

		fetchData();
	}, [id]);

	if (loading) return <p className={styles.loading}>Chargement...</p>;

	return (
		<>
			<Seo
				title="Catégorie"
				description="Produits par catégorie"
				url={`/categories/${id}`}
			/>

			<section className={styles.section}>
				<Title title={categoryName} />

				<div className={styles.products}>
					{products.map((product) => (
						<ProductListItem key={product.id} data={product} />
					))}
				</div>
			</section>
		</>
	);
}
