import type { Product } from "../../models/product";
import type { ApiResponse } from "../models/api_response";

class ApiProductService {
	// récupérer tous les produits
	public selectAll = async (
		token?: string,
	): Promise<ApiResponse<Product[]>> => {
		const headers: HeadersInit = {};
		if (token) headers["Authorization"] = `Bearer ${token}`;

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/api/product`,
			{
				headers,
			},
		);
		return await response.json();
	};

	// récupérer un produit
	public selectOne = async (
		id: number,
		token?: string,
	): Promise<ApiResponse<Product>> => {
		const headers: HeadersInit = {};
		if (token) headers["Authorization"] = `Bearer ${token}`;

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/api/product/${id}`,
			{
				headers,
			},
		);
		return await response.json();
	};

	// ajouter un produit
	public insert = async (
		data: FormData,
		token?: string,
	): Promise<ApiResponse<null>> => {
		const headers: HeadersInit = {};
		if (token) headers["Authorization"] = `Bearer ${token}`;

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/api/product`,
			{
				method: "POST",
				body: data, // ne PAS mettre Content-Type ici
				headers,
			},
		);
		return await response.json();
	};

	// mettre à jour un produit
	public update = async (
		id: number,
		data: FormData,
		token?: string,
	): Promise<ApiResponse<null>> => {
		const headers: HeadersInit = {};
		if (token) headers["Authorization"] = `Bearer ${token}`;

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/api/product/${id}`,
			{
				method: "PUT",
				body: data,
				headers,
			},
		);
		return await response.json();
	};

	// supprimer un produit
	public delete = async (
		id: number,
		token?: string,
	): Promise<ApiResponse<null>> => {
		const headers: HeadersInit = {};
		if (token) headers["Authorization"] = `Bearer ${token}`;

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/api/product/${id}`,
			{
				method: "DELETE",
				headers,
			},
		);
		return await response.json();
	};
}
export default ApiProductService;
