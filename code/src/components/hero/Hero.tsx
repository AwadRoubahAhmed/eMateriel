

import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero_shop.webp";
import styles from "./Hero.module.css";

export default function Hero() {
	return (
		<section className={styles.hero}>
			<div className={styles.leftSide}>
				<div className={styles.contentWrapper}>
					<div className={styles.content}>
						<span className={styles.divider}></span>
						<p className={styles.title}>MATÉRIEL HIGH-TECH</p>
					</div>

					<h1 className={styles.heading}>
						Nouveautés <br /> Collection 2026
					</h1>

					<div className={styles.textContent}>
						<Link to="/products" className={styles.cta}>
							ACHETEZ MAINTENANT
						</Link>
						<span className={styles.divider}></span>
					</div>
				</div>
			</div>

			<div className={styles.rightSide}>
				<img
					className={styles.image}
					src={heroImage}
					alt="Smartphone, ordinateur portable et accessoires"
				/>
			</div>
		</section>
	);
}
