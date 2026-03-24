import {
	FaFacebookF,
	FaInstagram,
	FaLinkedin,
	FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import FooterColumn from "./FooterColumn";
import Newsletter from "./Newsletter";

const FooterMain = () => {
	return (
		<div className={styles.footerMain}>
			{/* Brand */}
			<FooterColumn title="eMateriel">
				<p className={styles.textColumn}>
					Découvrez nos produits électroniques alliant qualité et performance
					pour répondre à tous vos besoins.
				</p>
				<div className={styles.socials}>
					<FaFacebookF />
					<FaTwitter />
					<FaInstagram />
					<FaLinkedin />
				</div>
			</FooterColumn>

			{/* Quick Links */}
			<FooterColumn title="Quick Links">
				<ul>
					<li className={styles.links}>
						<Link to="/apropos">Aprops de nous</Link>
					</li>
					<li className={styles.links}>
						<Link to="/contact">Contactez-nous</Link>
					</li>
					<li className={styles.links}>
						<Link to="/condition_generale">Conditions générales</Link>
					</li>
					<li className={styles.links}>
						{" "}
						<Link to="/Politique_Confidentialite">
							Politique de Confidentialité
						</Link>
					</li>
					<li className={styles.links}>
						<Link to="/FAQs">FAQs</Link>
					</li>
				</ul>
			</FooterColumn>

			{/* Categories */}
			<FooterColumn title="Categories">
				<ul>
					<li className={styles.links}>Mobiles</li>
					<li className={styles.links}>Appliances</li>
					<li className={styles.links}>Smartphones</li>
					<li className={styles.links}>Air Conditioners</li>
					<li className={styles.links}>Washing Machine</li>
					<li className={styles.links}>Kitchen Appliances</li>
					<li className={styles.links}>Gadget Accessories</li>
				</ul>
			</FooterColumn>

			{/* Newsletter */}
			<FooterColumn title="Newsletter">
				<Newsletter />
			</FooterColumn>
		</div>
	);
};

export default FooterMain;
