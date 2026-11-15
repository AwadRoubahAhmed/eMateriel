import { data } from "react-router";
import type { Category as CategoryType } from "../../../models/category";
import type { Product } from "../../../models/product";
import Category_Repository from "../../../server/repository/category_repository";
import Product_Repository from "../../../server/repository/product_repository";
import ProductList from "../../components/product/ProductList";
import Seo from "../../components/Seo";
import Title from "../../components/title/Title";

export const loader = async ({ params }: { params: { id?: string } }) => {
	const id = Number(params.id);
	const category = Number.isInteger(id) && id > 0 ? await new Category_Repository().selectOne(id) : null;
	if (!category) throw data("Catégorie introuvable", { status: 404 });
	return { category, products: await new Product_Repository().selectAll(id) };
};

export default function Category({
	loaderData,
}: {
	loaderData: { category: CategoryType; products: Product[] };
}) {
	const { category, products } = loaderData;
	return (
		<section className="page">
			<Seo
				title={category.name}
				description={(category.description ?? "").slice(0, 155) || `${category.name} sur eMatériel.`}
				path={`/categories/${category.id}`}
			/>
			<Title title={category.name} as="h1" />
			<ProductList products={products} />
		</section>
	);
}
