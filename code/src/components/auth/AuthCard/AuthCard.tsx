"use client";

import styles from "./AuthCard.module.css";

type AuthCardProps = {
	title: string;
	children: React.ReactNode;
};

export function AuthCard({ title, children }: AuthCardProps) {
	return (
		<section className={styles.card} aria-labelledby="auth-title">
			<h1 id="auth-title" className={styles.title}>
				{title}
			</h1>
			{children}
		</section>
	);
}
