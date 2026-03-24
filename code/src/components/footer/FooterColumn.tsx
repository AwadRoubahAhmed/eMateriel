import styles from "./Footer.module.css";

const FooterColumn = ({ title, children }) => {
	return (
		<div className={styles.footerColumn}>
			<h3>{title}</h3>
			{children}
		</div>
	);
};

export default FooterColumn;
