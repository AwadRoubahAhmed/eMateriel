import { Link } from "react-router-dom";
import type { Category } from "../../../models/category";
import styles from "../../pages/category/Category.module.css";

export default function CategoryItem({ data }: { data: Category }) {
	const description = data.description ?? "";
	return (
		<Link to={`/categories/${data.id}`} className={styles.card}>
			<h3 className={styles.title}>{data.name}</h3>
			<p className={styles.description}>
				{description.length > 100 ? `${description.slice(0, 100)}…` : description}
			</p>
		</Link>
	);
}
