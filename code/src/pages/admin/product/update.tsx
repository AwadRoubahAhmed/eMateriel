import { use } from "react";
import type { Category } from "../../../../models/category";
import type { Product } from "../../../../models/product";
import AdminProductFormContent from "../../../components/admin/product/admin_product_form_content";
import ApiCategoryService from "../../../services/api_category_service";
import ApiProductService from "../../../services/api_product_service";

type FormUpdateProps = {
	params: {
		id: string;
	};
};

const FormUpdate = ({ params }: FormUpdateProps) => {
	console.log("ID:", params.id);

	const product = use(new ApiProductService().selectOne(Number(params.id)))
		.data as Product;

	const categories = use(new ApiCategoryService().selectAll())
		.data as Category[];

	return <AdminProductFormContent categories={categories} product={product} />;
};

export default FormUpdate;
