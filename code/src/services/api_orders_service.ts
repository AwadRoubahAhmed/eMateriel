import type { ApiResponse } from "../../models/api_response";
import type { Orders } from "../../models/orders";

class ApiOrdersService {
	private baseUrl = `${import.meta.env.VITE_API_URL}/api/orders`;

	// GET ALL
	public selectAll = async (): Promise<ApiResponse<Orders[]>> => {
		const response = await fetch(this.baseUrl);
		return await response.json();
	};

	// GET ONE
	public selectOne = async (id: number): Promise<ApiResponse<Orders>> => {
		const response = await fetch(`${this.baseUrl}/${id}`);
		return await response.json();
	};

	// CREATE
	public create = async (
		data: Partial<Orders>,
	): Promise<ApiResponse<Orders>> => {
		const response = await fetch(this.baseUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		return await response.json();
	};

	// UPDATE
	public update = async (
		id: number,
		data: Partial<Orders>,
	): Promise<ApiResponse<Orders>> => {
		const response = await fetch(`${this.baseUrl}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		return await response.json();
	};

	// DELETE
	public delete = async (id: number): Promise<ApiResponse<null>> => {
		const response = await fetch(`${this.baseUrl}/${id}`, {
			method: "DELETE",
		});
		return await response.json();
	};

	public selectUserCart = async (
		userId: number,
	): Promise<ApiResponse<Orders>> => {
		const response = await fetch(`${this.baseUrl}/user/${userId}`);
		return await response.json();
	};
}

export default ApiOrdersService;
