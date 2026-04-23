import type { InsertOneResult } from "mongodb";
import type { Contact } from "../../models/contact";
import type { ApiResponse } from "../models/api_response";

class ContactApiService {
	private prefix = "/api/contact";

	private baseUrl = import.meta.env.VITE_API_URL;

	private async request<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
		const response = await fetch(input, init);

		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status}`);
		}

		return response.json();
	}

	// GET all contacts
	public selectAll = async (): Promise<ApiResponse<Contact[]>> => {
		const url = `${this.baseUrl}${this.prefix}`;

		return this.request<ApiResponse<Contact[]>>(url);
	};

	// POST contact
	public insert = async (
		data: Contact,
	): Promise<ApiResponse<InsertOneResult>> => {
		const url = `${this.baseUrl}${this.prefix}`;

		return this.request<ApiResponse<InsertOneResult>>(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(data),
		});
	};
}

export default ContactApiService;
