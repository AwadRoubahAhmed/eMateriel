import type { ProductListItemProps } from "../../models/props/ProductListItemProps";


export default function ProductListItem({ data }: ProductListItemProps) {
  return (
      <div>
          <p>
               {data.id}: {data.name}
          </p>
      </div>
  )
}
