"use client";

import styles from "../../pages/category/Category.module.css";
import Title from "../title/Title";
import CategoryList from "./CategoryList";

export default function CategorySection() {
	return (
		<section className={styles.section}>
			<Title title="Nos Catégories" />
			<CategoryList />
		</section>
	);
}
