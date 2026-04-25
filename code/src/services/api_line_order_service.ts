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

	public selectByOrder = async (orderId: number) => {
		const response = await fetch(`${this.baseUrl}/order/${orderId}`);
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

	async findByOrderAndProduct(orderId: number, productId: number) {
		const res = await fetch(
			`${this.baseUrl}/find?orderId=${orderId}&productId=${productId}`,
		);

		const data = await res.json();

		if (!res.ok) {
			return {
				data: null,
				status: res.status,
				message: data?.message ?? "Error",
			};
		}

		return {
			data: data.data ?? null,
			status: res.status,
		};
	}

	public incrementQty = async (
		id: number,
		qty: number,
		total: number,
	): Promise<ApiResponse<Line_order>> => {
		const response = await fetch(`${this.baseUrl}/${id}/increment`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ qty, total }),
		});
		return await response.json();
	};
}

export default ApiLineOrderService;
