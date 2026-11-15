"use client";

import { useCallback, useEffect, useState } from "react";
import { api, errorMessage } from "../../services/api";

// Charge une ressource de l'API pour une page d'admin ; reload() après une modification.
export const useAdminData = <T,>(path: string) => {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState("");

	const reload = useCallback(async () => {
		const result = await api<T>(path);
		if (result.status === 200) {
			setData(result.data ?? null);
			setError("");
		} else {
			setError(errorMessage(result));
		}
	}, [path]);

	useEffect(() => {
		reload();
	}, [reload]);

	return { data, error, setError, reload };
};
