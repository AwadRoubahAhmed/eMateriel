import Category_Repository from "../../../server/repository/category_repository";
import styles from "../../pages/category/Category.module.css";
import Title from "../title/Title";
import CategoryItem from "./CategoryItem";

// Composant serveur : les catégories sont lues en base au rendu (visibles par les moteurs)
export default async function CategorySection() {
	const categories = await new Category_Repository().selectAll();
	return (
		<section className={styles.section} aria-labelledby="categories-title">
			<Title title="Nos catégories" id="categories-title" />
			<div className={styles.grid}>
				{categories.map((category) => (
					<CategoryItem key={category.id} data={category} />
				))}
			</div>
		</section>
	);
}
