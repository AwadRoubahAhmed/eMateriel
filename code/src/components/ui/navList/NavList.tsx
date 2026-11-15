"use client";

import { NavLink } from "react-router-dom";
import styles from "./NavList.module.css";

type NavListProps = {
	isMenuOpen: boolean;
	closeMenu: () => void;
};

const LINKS = [
	{ to: "/", label: "Accueil", end: true },
	{ to: "/products", label: "Nos produits", end: false },
	{ to: "/apropos", label: "À propos", end: true },
	{ to: "/contact", label: "Contact", end: true },
];

export default function NavList({ isMenuOpen, closeMenu }: NavListProps) {
	return (
		<ul className={`${styles.navList} ${isMenuOpen ? styles.mobileOpen : ""}`}>
			{LINKS.map(({ to, label, end }) => (
				<li key={to}>
					<NavLink
						to={to}
						end={end}
						className={({ isActive }) =>
							isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
						}
						onClick={closeMenu}
					>
						{label}
					</NavLink>
				</li>
			))}
		</ul>
	);
}
