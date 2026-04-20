"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import FooterColumn from "./FooterColumn";

// Type pour les catégories
type Category = {
	id: number;
	name: string;
	description: string;
	slug: string;
};

const FooterCategories = () => {
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const data: Category[] = [
				{
					id: 1,
					name: "Téléphones",
					description:
						"Découvrez notre sélection de smartphones dernier cri...",
					slug: "telephones",
				},
				{
					id: 2,
					name: "Tablettes",
					description:
						"Explorez nos tablettes tactiles, idéales pour le travail...",
					slug: "tablettes",
				},
				{
					id: 3,
					name: "Ordinateurs",
					description: "Souris, claviers, écrans et casques...",
					slug: "ordinateurs",
				},
				{
					id: 4,
					name: "Accessoires",
					description: "Protégez et personnalisez votre smartphone...",
					slug: "accessoires",
				},
			];
			setCategories(data);
		};

		fetchCategories();
	}, []);

	return (
		<FooterColumn title="Categories">
			<ul>
				{categories.map((cat) => (
					<li key={cat.id} className={styles.links}>
						<Link
							to={`/products/category/${cat.slug}`}
							title={cat.description}
						>
							{cat.name}
						</Link>
					</li>
				))}
			</ul>
		</FooterColumn>
	);
};

export default FooterCategories;
