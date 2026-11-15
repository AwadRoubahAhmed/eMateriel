import type { ReactNode } from "react";
import styles from "./Footer.module.css";

type FooterColumnProps = {
	title: string;
	children: ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => {
	return (
		<div className={styles.footerColumn}>
			<h2 className={styles.titleItem}>{title}</h2>
			{children}
		</div>
	);
};

export default FooterColumn;
