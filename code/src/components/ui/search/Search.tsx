import styles from "./Search.module.css"
import { FaSearch } from "react-icons/fa";


export default function Search() {
    return (
        <div className={styles.group}>
            <input
                className={styles.input}
                type="search"
                placeholder="Rechercher..."
            />

            <FaSearch className={styles.search_icon} />
        </div>
    )
}
