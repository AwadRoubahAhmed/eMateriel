"use client";

import { Link } from "react-router-dom";
import type { Category } from "../../../models/category";
import styles from "../../pages/category/Category.module.css";

type CategoryItemProps = {
	data: Category;
};

export default function CategoryItem({ data }: CategoryItemProps) {
	return (
		<Link to={`/categories/${data.id}`} className={styles.card}>
			<h3 className={styles.title}>{data.name}</h3>
			<p className={styles.description}>{data.description.slice(0, 100)}...</p>
		</Link>
	);
}
