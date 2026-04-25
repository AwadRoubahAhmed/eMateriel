"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Category } from "../../../../models/category";
import AdminCategoryFormContent from "../../../components/admin/categorie/AdminCategoryFormContent";
import ApiCategoryService from "../../../services/api_category_service";

const FormUpdateCategory = () => {
	const { id } = useParams();
	const [category, setCategory] = useState<Category | undefined>(undefined);

	useEffect(() => {
		const fetch = async () => {
			if (!id) return;

			try {
				const response = await new ApiCategoryService().selectOne(Number(id));

				console.log("UPDATE API RESULT:", response);

				if (response?.status === 200 && response?.data) {
					setCategory(response.data);
				} else {
					setCategory(undefined);
				}
			} catch (error) {
				console.error("API ERROR:", error);
				setCategory(undefined);
			}
		};

		fetch();
	}, [id]);
	console.log("CATEGORY STATE:", category);

	return <AdminCategoryFormContent category={category} />;
};

export default FormUpdateCategory;
