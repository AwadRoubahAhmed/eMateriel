import styles from "./Footer.module.css";

const Newsletter = () => {
	return (
		<div className={styles.newsletter}>
			<p className={styles.textNewsletter}>
				Subscribe to our newsletter to receive updates and exclusive offers.
			</p>
			<input type="email" placeholder="Enter your email" />
			<button type="button">Subscribe</button>
		</div>
	);
};

export default Newsletter;
