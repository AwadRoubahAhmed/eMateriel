import type { ProductListItemProps } from "../../models/props/ProductListItemProps";
import styles from './ProductListItem.module.css';


export default function ProductListItem({ data }: ProductListItemProps) {
  return (
      <div className={styles.container}>
          <p>
               {data.id}: {data.name}
          </p>
          <img src={`/images/${data.image}`} alt={data.name} />
      </div>
  )
}
