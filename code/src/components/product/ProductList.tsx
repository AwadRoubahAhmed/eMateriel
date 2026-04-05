"use client";

import { useEffect, useState } from "react";
import type { Product } from "../../../models/product";
import ApiProductService from "../../services/api_product_service";
import styles from "./ProductList.module.css";
import ProductListItem from "./ProductListItem";

export default function ProductList() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			const result = await new ApiProductService().selectAll();
			setProducts(result.data ?? []);
			setLoading(false);
		};
		fetchProducts();
	}, []);

	if (loading) return <p>Chargement...</p>;

	return (
		<section className={styles.gridContainer}>
			{products.map((product) => (
				<ProductListItem data={product} key={product.id} />
			))}
		</section>
	);
}
