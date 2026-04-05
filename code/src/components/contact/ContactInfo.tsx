import styles from "../../pages/contact/Contact.module.css";

export default function ContactInfo() {
	return (
		<div className={styles.info}>
			<h2>Informations</h2>
			<p>Email : support@emateriel.com</p>
			<p>Téléphone : +33 1 23 45 67 89</p>
			<p>Adresse : 10 rue de la Tech, Paris</p>
		</div>
	);
}
