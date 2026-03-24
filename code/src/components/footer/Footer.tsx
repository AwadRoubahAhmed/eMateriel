import styles from "./Footer.module.css";
import FooterBottom from "./FooterBottom";
import FooterMain from "./FooterMain";
import FooterTop from "./FooterTop";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<FooterTop />
			<FooterMain />
			<FooterBottom />
		</footer>
	);
};

export default Footer;
