import { Link } from "react-router-dom";
import Seo from "../../components/Seo";
import styles from "./Error.module.css";

export default function NotFound({ message }: { message?: string }) {
	return (
		<section className={`page ${styles.section}`}>
			<Seo
				title="Page introuvable"
				description="Cette page n'existe pas ou a été déplacée."
				path="/404"
				noindex
			/>
			<p className={styles.code} aria-hidden="true">
				404
			</p>
			<h1>Page introuvable</h1>
			<p className={styles.text}>
				{message ?? "Cette page n'existe pas ou a été déplacée."}
			</p>
			<Link to="/products" className="btn">
				Voir nos produits
			</Link>
		</section>
	);
}
