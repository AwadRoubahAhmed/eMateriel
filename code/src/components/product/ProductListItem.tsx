import type { ProductListItemProps } from "../../models/props/ProductListItemProps";


export default function ProductListItem({ data }: ProductListItemProps) {
  return (
      <div>
          <p>
               {data.id}: {data.name}
      </p>
      <img src={`/images/${data.image}`} alt={data.name} />
      </div>
  )
}
