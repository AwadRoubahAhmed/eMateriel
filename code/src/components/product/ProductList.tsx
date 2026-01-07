import { use } from "react"
import ApiProductService from "../../services/api_product_service"
import ProductListItem from "./ProductListItem";

export default function ProductList() {
     

  const result = use(new ApiProductService().selectAll());
  
    //console.log(result)


  return (
    <div>
      {
        result.data?.map(product => {
          return (
            <ProductListItem data={product} key={product.id} />
           )
        })
          
      }

    </div>
  )
}
