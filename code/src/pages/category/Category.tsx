"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../../../models/product";
import ProductListItem from "../../components/product/ProductListItem";
import Seo from "../../components/Seo";
import ApiProductService from "../../services/api_product_service";
import styles from "./Category.module.css";

export default function Category() {
	const { id } = useParams();
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!id) return;

		const fetchProducts = async () => {
			const productService = new ApiProductService();
			const res = await productService.selectAll();

			// Optional chaining et fallback vide
			const filtered =
				res?.data?.filter(
					(product) => product.category?.id.toString() === id,
				) ?? [];

			setProducts(filtered);
			setLoading(false);
		};

		fetchProducts();
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
				<h1 className={styles.heading}>Produits</h1>

				<div className={styles.products}>
					{products.map((product) => (
						<ProductListItem key={product.id} data={product} />
					))}
				</div>
			</section>
		</>
	);
}
