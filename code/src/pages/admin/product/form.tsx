import { use } from "react"
import AdminProductFormContent from "../../../components/admin/product/admin_product_form_content"
import ApiCategoryService from "../../../services/api_category_service"
import type { Category } from "../../../../models/category";

const AdminProductForm = () => {

    const categories = use(new ApiCategoryService().selectAll()).data as Category[];


    return <>
        <AdminProductFormContent categories={categories} />
    </>
}

export default AdminProductForm