import { NavLink } from "react-router-dom";
import styles from "./NavList.module.css";

type NavListProps = {
	isMenuOpen: boolean;
	closeMenu: () => void;
};

export default function NavList({ isMenuOpen, closeMenu }: NavListProps) {
	const links = [
		{ to: "/", label: "Accueil", end: true },
		{ to: "/products", label: "Nos Produits" },
		{ to: "/contact", label: "Contact" },
		{ to: "/apropos", label: "À propos" },
		{ to: "/admin", label: "Admin" },
	];

	return (
		<ul className={`${styles.navList} ${isMenuOpen ? styles.mobileOpen : ""}`}>
			{links.map(({ to, label, end }) => (
				<li key={to} role="none">
					<NavLink
						to={to}
						end={end}
						role="menuitem"
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
