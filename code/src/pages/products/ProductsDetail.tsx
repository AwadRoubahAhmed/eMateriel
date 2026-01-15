import { use } from "react";
import Seo from "../../components/Seo";
import ApiProductService from "../../services/api_product_service";

export default function ProductsDetail({ params }) {
	console.log(params);

	const result = use(new ApiProductService().selectOne(params.id));
		console.log(result);

	return (
		<>
			<Seo
				title="eMatériel - Products Detail"
				description="La page Products Detail"
				url="/products"
			/>
	
			<h1>Products page</h1>

			{
				result.data?.name
			}

		
		</>
	);
}
