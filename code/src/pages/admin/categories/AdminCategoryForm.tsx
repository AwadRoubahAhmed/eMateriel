"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Category } from "../../../../models/category";
import AdminCategoryFormContent from "../../../components/admin/categorie/AdminCategoryFormContent";
import ApiCategoryService from "../../../services/api_category_service";

const AdminCategoryForm = () => {
	const { id } = useParams();
	const [category, setCategory] = useState<Category | undefined>(undefined);

	useEffect(() => {
		const fetch = async () => {
			if (!id) return;

			const res = await new ApiCategoryService().selectOne(Number(id));

			if (res.status === 200 && res.data) {
				setCategory(res.data);
			}
		};

		fetch();
	}, [id]);

	console.log("CATEGORY FROM API:", category);

	return <AdminCategoryFormContent category={category} />;
};

export default AdminCategoryForm;
