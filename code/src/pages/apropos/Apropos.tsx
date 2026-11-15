import AboutIntro from "../../components/apropos/AboutIntro";
import AboutValues from "../../components/apropos/AboutValues";
import Seo from "../../components/Seo";
import Title from "../../components/title/Title";
import styles from "./Apropos.module.css";

export default function Apropos() {
	return (
		<>
			<Seo
				title="À propos"
				description="eMatériel, boutique en ligne de matériel électronique pour particuliers et professionnels."
				path="/apropos"
			/>

			<section className={`page ${styles.container}`}>
				<Title title="À propos de nous" as="h1" />

				<AboutIntro />
				<AboutValues />
			</section>
		</>
	);
}
