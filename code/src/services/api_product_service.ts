import type { ApiResponse } from "../../models/api_response";
import type { Product } from "../../models/product";

class ApiProductService {
	// récupérer tous les produits
	public selectAll = async (): Promise<ApiResponse<Product[]>> => {
		const request = new Request(`${import.meta.env.VITE_API_URL}/api/product`);
		const response = await fetch(request);
		const results = await response.json();
		return results;
	};

	// récupérer un produit
	public selectOne = async (id: number): Promise<ApiResponse<Product>> => {
		const request = new Request(
			`${import.meta.env.VITE_API_URL}/api/product/${id}`,
		);
		const response = await fetch(request);
		const results = await response.json();
		return results;
	};

	public getByCategory = async (
		categoryId: string,
	): Promise<ApiResponse<Product[]>> => {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/api/product/category/${categoryId}`,
		);
		return await response.json();
	};

	public insert = async (data: FormData): Promise<ApiResponse<null>> => {
		const request = new Request(`${import.meta.env.VITE_API_URL}/api/product`, {
			method: "post",
			body: data,
		});
		const response = await fetch(request);
		const results = await response.json();
		return results;
	};

	// mettre à jour un produit
	public update = async (
		id: number,
		data: FormData,
	): Promise<ApiResponse<null>> => {
		const request = new Request(
			`${import.meta.env.VITE_API_URL}/api/product/${id}`,
			{
				method: "PUT",
				body: data,
			},
		);
		const response = await fetch(request);
		const results = await response.json();
		return results;
	};

	// supprimer un produit
	public delete = async (id: number): Promise<ApiResponse<null>> => {
		const request = new Request(
			`${import.meta.env.VITE_API_URL}/api/product/${id}`,
			{
				method: "DELETE",
			},
		);
		const response = await fetch(request);
		const results = await response.json();
		return results;
	};
}
export default ApiProductService;
