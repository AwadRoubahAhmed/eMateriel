import { FaPercent } from "react-icons/fa";
import { GrDeliver, GrSecure } from "react-icons/gr";
import { MdAccessTime } from "react-icons/md";
import styles from "./Delivery.module.css";

export default function Delivery() {
	return (
		<section className={styles.wrapper}>
			<div className={styles.grid}>
				<div className={styles.deliveryWrapper}>
					<div className={styles.card}>
						<p>
							<FaPercent size={25} />
						</p>
						<div>
							<h4 className={styles.title}>Paiements sécurisés</h4>
							<p className={styles.text}>
								Chaque semaine, de nouvelles soldes.
							</p>
						</div>
					</div>
				</div>

				<div className={styles.deliveryWrapper}>
					<div className={styles.card}>
						<p>
							<GrDeliver size={25} />
						</p>
						<div>
							<h4 className={styles.title}>Livraison gratuit</h4>
							<p className={styles.text}>
								100% gratuit pour tous les commandes.
							</p>
						</div>
					</div>
				</div>

				<div className={styles.deliveryWrapper}>
					<div className={styles.card}>
						<p>
							<MdAccessTime size={25} />
						</p>
						<div>
							<h4 className={styles.title}>
								Assitance de qualité 24h/24 et 7j/7
							</h4>
							<p className={styles.text}>
								Nous accordons une grande importance à vos expériences.
							</p>
						</div>
					</div>
				</div>

				<div className={styles.deliveryWrapper}>
					<div className={styles.card}>
						<p>
							<GrSecure size={25} />
						</p>
						<div>
							<h4 className={styles.title}>Paiements sécurisés</h4>
							<p className={styles.text}>Méthode de paiement 100% sécuriée.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
