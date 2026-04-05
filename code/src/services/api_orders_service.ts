import type { ApiResponse } from "../../models/api_response";
import type { Orders } from "../../models/orders";

class ApiOrdersService {
	// récupérer tous les produits
	public selectAll = async (): Promise<ApiResponse<Orders[]>> => {
		const request = new Request(`${import.meta.env.VITE_API_URL}/api/orders`);
		const response = await fetch(request);
		const results = await response.json();
		return results;
	};
}

export default ApiOrdersService;
