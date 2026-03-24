import {
	FaClock,
	FaEnvelope,
	FaMapMarkerAlt,
	FaPhoneAlt,
} from "react-icons/fa";
import styles from "./Footer.module.css";

const FooterTop = () => {
	return (
		<div className={styles.footerTop}>
			<div className={styles.footerItem}>
				<FaMapMarkerAlt />
				<div>
					<h4 className={styles.titleItem}>Nous rendre Visite</h4>
					<p>18ème arrondisement, Paris</p>
				</div>
			</div>

			<div className={styles.footerItem}>
				<FaPhoneAlt />
				<div>
					<h4 className={styles.titleItem}>Appelez-nous</h4>
					<p>+12 958 648 597</p>
				</div>
			</div>

			<div className={styles.footerItem}>
				<FaClock />
				<div>
					<h4 className={styles.titleItem}>Heures de Travail</h4>
					<p>Mon - Sam: 10:00 AM - 7:00 PM</p>
				</div>
			</div>

			<div className={styles.footerItem}>
				<FaEnvelope />
				<div>
					<h4 className={styles.titleItem}>Ecrivez-nous</h4>
					<p>emateriel@gmail.com</p>
				</div>
			</div>
		</div>
	);
};

export default FooterTop;
