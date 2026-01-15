import type { ApiResponse } from "../../models/api_response";
import type { Category } from "../../models/category";

class ApiCategoryService {
    // récupérer tous les produits
    public selectAll = async (): Promise<ApiResponse<Category[]>> => {
        const request = new
            Request(`${import.meta.env.VITE_API_URL}/api/category`);
        const response = await fetch(request);
        const results = await response.json();
        return results;
    }
}

export default ApiCategoryService;