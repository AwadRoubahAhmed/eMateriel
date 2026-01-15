import { use } from "react";
import ApiProductService from "../../../services/api_product_service"
import type { Product } from "../../../../models/product";
import { Link } from "react-router-dom";

const AdminProductHomeContent = () => {
  const results = use(new ApiProductService().selectAll()).data as Product[];

  return (
    <>
      <h1>AdminProductHome</h1>

      <p>
        <Link to='/admin/product/form' >Ajouter</Link>
      </p>

      {
        results.map((data) => {
          return <div>
            <p>
              {data.id}: {data.name}
            </p>
            <img src={`/images/${data.image}`} alt={data.name} />
            <p>

            </p>
          </div>
        })
      }
    </>
  )
}

export default AdminProductHomeContent