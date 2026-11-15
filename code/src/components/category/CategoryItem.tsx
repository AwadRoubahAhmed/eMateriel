import type { IconType } from "react-icons";
import { FiArrowRight, FiHeadphones, FiMonitor, FiPackage, FiSmartphone, FiTablet } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Category } from "../../../models/category";
import styles from "../../pages/category/Category.module.css";

// icône choisie d'après le nom de la catégorie (catégories ajoutées en admin : icône générique)
const ICONS: [RegExp, IconType][] = [
	[/t[ée]l[ée]phone|smartphone|mobile/i, FiSmartphone],
	[/tablette/i, FiTablet],
	[/ordinateur|pc|portable/i, FiMonitor],
	[/accessoire|audio|casque/i, FiHeadphones],
];

export default function CategoryItem({ data }: { data: Category }) {
	const Icon = ICONS.find(([pattern]) => pattern.test(data.name))?.[1] ?? FiPackage;
	const description = data.description ?? "";
	return (
		<Link to={`/categories/${data.id}`} className={styles.card}>
			<span className={styles.icon} aria-hidden="true">
				<Icon />
			</span>
			<span className={styles.cardBody}>
				<h3 className={styles.title}>{data.name}</h3>
				<span className={styles.description}>
					{description.length > 90 ? `${description.slice(0, 90)}…` : description}
				</span>
				<span className={styles.more}>
					{data.product_count !== undefined && `${data.product_count} produit${Number(data.product_count) > 1 ? "s" : ""} · `}
					Découvrir <FiArrowRight aria-hidden="true" />
				</span>
			</span>
		</Link>
	);
}
