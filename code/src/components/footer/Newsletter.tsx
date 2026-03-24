import styles from "./Footer.module.css";

const Newsletter = () => {
	return (
		<div className={styles.newsletter}>
			<p className={styles.textNewsletter}>
				 Inscrivez-vous à notre newsletter pour recevoir les nouveautés et
				offres exclusives.
			</p>
			<input type="email" placeholder="Enter your email" />
			<button type="button">Subscribe</button>
		</div>
	);
};

export default Newsletter;
