import type { ApiResponse } from "../models/api_response";
import { getSession, logout } from "./security_service";

export type ApiError = { field: string; message: string };
export type ApiResult<T> = ApiResponse<T> & { errors?: ApiError[]; token?: string };

// Appel à l'API du même site ; ajoute le jeton de connexion s'il existe.
export const api = async <T = unknown>(
	path: string,
	options: { method?: string; body?: unknown } = {},
): Promise<ApiResult<T>> => {
	const headers: Record<string, string> = {};
	const token = getSession()?.token;
	if (token) headers.Authorization = `Bearer ${token}`;

	let body: BodyInit | undefined;
	if (options.body instanceof FormData) {
		body = options.body; // le navigateur fixe lui-même le Content-Type multipart
	} else if (options.body !== undefined) {
		headers["Content-Type"] = "application/json";
		body = JSON.stringify(options.body);
	}

	let response: Response;
	try {
		response = await fetch(path, { method: options.method ?? "GET", headers, body });
	} catch {
		return { status: 0, message: "Serveur injoignable, vérifiez votre connexion" };
	}

	// jeton expiré ou invalide : on déconnecte proprement
	if (response.status === 401 && token) logout();

	try {
		return (await response.json()) as ApiResult<T>;
	} catch {
		return { status: response.status, message: "Réponse inattendue du serveur" };
	}
};

// premier message d'erreur lisible d'une réponse
export const errorMessage = (result: ApiResult<unknown>) =>
	result.errors?.[0]?.message ?? result.message ?? "Une erreur est survenue";
