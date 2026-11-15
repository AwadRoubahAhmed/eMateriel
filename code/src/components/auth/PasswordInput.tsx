"use client";

import { type ComponentProps, forwardRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./PasswordInput.module.css";

// Champ mot de passe avec bouton « œil » pour afficher / masquer la saisie
const PasswordInput = forwardRef<HTMLInputElement, Omit<ComponentProps<"input">, "type">>(
	function PasswordInput(props, ref) {
		const [visible, setVisible] = useState(false);
		return (
			<div className={styles.wrapper}>
				<input ref={ref} type={visible ? "text" : "password"} {...props} />
				<button
					type="button"
					className={styles.toggle}
					onClick={() => setVisible((v) => !v)}
					aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
					aria-pressed={visible}
				>
					{visible ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
				</button>
			</div>
		);
	},
);

export default PasswordInput;
