import type { Category } from "../../models/category";
import type { ApiResponse } from "../models/api_response";

type CategoryCreate = {
	name: string;
	description: string;
};

class ApiCategoryService {
	// récupérer toutes les catégories
	public selectAll = async (
		token?: string,
	): Promise<ApiResponse<Category[]>> => {
		const headers: HeadersInit = {};
		if (token) headers["Authorization"] = `Bearer ${token}`;

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/api/category`,
			{ headers },
		);
		return await response.json();
	};

	// récupérer une catégorie
	public selectOne = async (
		id: number,
		token?: string,
	): Promise<ApiResponse<Category>> => {
		const headers: HeadersInit = {};
		if (token) headers["Authorization"] = `Bearer ${token}`;

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/api/category/${id}`,
			{ headers },
		);
		return await response.json();
	};

	// ajouter
	public insert = async (
		data: CategoryCreate,
		token?: string,
	): Promise<ApiResponse<null>> => {
		const headers: HeadersInit = {
			"Content-Type": "application/json",
		};

		if (token) headers["Authorization"] = `Bearer ${token}`;

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/api/category`,
			{
				method: "POST",
				headers,
				body: JSON.stringify(data),
			},
		);

		return await response.json();
	};

	// update
	public update = async (
		id: number,
		data: CategoryCreate,
		token?: string,
	): Promise<ApiResponse<null>> => {
		const headers: HeadersInit = {
			"Content-Type": "application/json",
		};

		if (token) headers["Authorization"] = `Bearer ${token}`;

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/api/category/${id}`,
			{
				method: "PUT",
				body: JSON.stringify(data),
				headers,
			},
		);

		return await response.json();
	};

	// delete
	public delete = async (
		id: number,
		token?: string,
	): Promise<ApiResponse<null>> => {
		const headers: HeadersInit = {};
		if (token) headers["Authorization"] = `Bearer ${token}`;

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/api/category/${id}`,
			{
				method: "DELETE",
				headers,
			},
		);
		return await response.json();
	};
}

export default ApiCategoryService;
