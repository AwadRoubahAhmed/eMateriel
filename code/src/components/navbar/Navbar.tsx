"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import styles from "./Navbar.module.css";
import logo from "../../assets/images/eMatériel.png";
import NavList from "../ui/navList/NavList";
import Search from "../ui/search/Search";

export default function Navbar() {
	// States;
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Comportements;
	const toggleMenu = () => setIsMenuOpen((prev) => !prev);

	/* Bonne pratique : bloquer le scroll en mobile */
	useEffect(() => {
		document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
	}, [isMenuOpen]);

	// Affichage;
	return (
		<header className={styles.header}>
			<nav className={styles.navbar} aria-label="Navigation principale">
				{/* Logo */}
				<Link to="/" className={styles.logoWrapper}>
					<img src={logo} alt="eMatériel" className={styles.logo} />
				</Link>

				{/* Navigation */}
				<NavList isMenuOpen={isMenuOpen} />

				{/* Search */}
				<Search />

				{/* Icons */}
				<div className={styles.icons}>
					<Link to="/panier" aria-label="Voir le panier">
						<FaCartArrowDown size={22} />
					</Link>
					<Link to="/connexion" aria-label="Se connecter">
						<FaUserAlt size={22} />
					</Link>
				</div>

				{/* Hamburger / Close */}
				<button
					onClick={toggleMenu}
					className={styles.menuButton}
					aria-label="Menu"
				>
					{isMenuOpen ? (
						<IoCloseSharp
							size={28}
							className={`${styles.menuIcon} ${styles.close}`}
						/>
					) : (
						<GiHamburgerMenu
							size={28}
							className={`${styles.menuIcon} ${styles.burger}`}
						/>
					)}
				</button>
			</nav>
		</header>
	);
}
