"use client";

import styles from "./SwitchMode.module.css";

type Mode = "login" | "register";

type SwitchModeProps = {
	mode: Mode;
	onSwitch: () => void;
};

export function SwitchMode({ mode, onSwitch }: SwitchModeProps) {
	return (
		<p className={styles.switch}>
			{mode === "login" ? "Pas de compte ?" : "Déjà inscrit ?"}{" "}
			<button type="button" onClick={onSwitch}>
				{mode === "login" ? "Inscrivez-vous" : "Connectez-vous"}
			</button>
		</p>
	);
}
