"use client";

import styles from "../../styles/Category.module.css";
import CategoryList from "./CategoryList";

export default function CategorySection() {
	return (
		<section className={styles.section}>
			<h2 className={styles.heading}>Nos Catégories</h2>
			<CategoryList />
		</section>
	);
}
