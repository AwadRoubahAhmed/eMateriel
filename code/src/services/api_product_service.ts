import type { ApiResponse } from "../../models/api_response";
import type { Product } from "../../models/product";

class ApiProductService {
    // récupérer tous les produits
    public selectAll = async (): Promise<ApiResponse<Product[]>> => {
        const request = new
            Request(`${import.meta.env.VITE_API_URL}/api/product`);
        const response = await fetch(request);
        const results = await response.json();
        return results;
    }

    // récupérer un produit
    public selectOne = async (id: number): Promise<ApiResponse<Product>> => {
        const request = new
            Request(`${import.meta.env.VITE_API_URL}/api/product/${id}`);
        const response = await fetch(request);
        const results = await response.json();
        return results;
    }
}
export default ApiProductService;