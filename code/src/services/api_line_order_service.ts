import type { ApiResponse } from "../../models/api_response";
import type { Line_order } from "../../models/line_order";

class ApiLineOrderService {
	private baseUrl = `${import.meta.env.VITE_API_URL}/api/line_order`;

	// GET ALL
	public selectAll = async (): Promise<ApiResponse<Line_order[]>> => {
		const response = await fetch(this.baseUrl);
		return await response.json();
	};

	// GET ONE
	public selectOne = async (id: number): Promise<ApiResponse<Line_order>> => {
		const response = await fetch(`${this.baseUrl}/${id}`);
		return await response.json();
	};

	// CREATE
	public create = async (
		data: Partial<Line_order>,
	): Promise<ApiResponse<Line_order>> => {
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
		data: Partial<Line_order>,
	): Promise<ApiResponse<Line_order>> => {
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
}

export default ApiLineOrderService;
