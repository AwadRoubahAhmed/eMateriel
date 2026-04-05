"use client";

import AboutIntro from "../../components/apropos/AboutIntro";
import AboutValues from "../../components/apropos/AboutValues";
import Seo from "../../components/Seo";
import Title from "../../components/title/Title";
import styles from "./Apropos.module.css";

export default function Apropos() {
	return (
		<>
			<Seo
				title="eMatériel - À propos"
				description="Découvrez notre entreprise spécialisée en matériel électronique"
				url="/apropos"
			/>

			<section className={styles.container}>
				<Title title="À propos de nous" />

				<AboutIntro />
				<AboutValues />
			</section>
		</>
	);
}
