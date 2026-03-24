import type { ReactNode } from "react";
import styles from "./Footer.module.css";

type FooterColumnProps = {
	title: string;
	children: ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => {
	return (
		<div className={styles.footerColumn}>
			<h3 className={styles.titleItem}>{title}</h3>
			{children}
		</div>
	);
};

export default FooterColumn;
