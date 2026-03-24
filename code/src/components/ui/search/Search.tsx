import { FaSearch } from "react-icons/fa";
import styles from "./Search.module.css";

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
	);
}
