"use client";

import { useEffect, useState } from "react";
import { FaCartArrowDown, FaSearch, FaUserAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

import { Link } from "react-router-dom";
import logo from "../../assets/images/eMatériel.png";
import NavList from "../ui/navList/NavList";
import styles from "./Navbar.module.css";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen((prev) => !prev);
	const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

	// Bloquer le scroll en mobile si menu ouvert
	useEffect(() => {
		document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
	}, [isMenuOpen]);

	return (
		<header className={styles.header}>
			<nav className={styles.navbar} aria-label="Navigation principale">
				{/* Logo */}
				<Link to="/" className={styles.logoWrapper}>
					<img src={logo} alt="eMatériel" className={styles.logo} />
				</Link>

				{/* Navigation */}
				<NavList
					isMenuOpen={isMenuOpen}
					closeMenu={() => setIsMenuOpen(false)}
				/>

				{/* Icons */}
				<div className={styles.icons}>
					<Link to="/panier" aria-label="Recherche">
						<FaSearch size={22} />
					</Link>

					{/* Dropdown utilisateur */}
					<div className={styles.dropdownWrapper}>
						<button
							type="button"
							className={styles.dropdownButton}
							onClick={() => toggleDropdown()}
							aria-haspopup="true"
							aria-expanded={isDropdownOpen}
						>
							<FaUserAlt size={22} />
						</button>

						{isDropdownOpen && (
							<div className={styles.dropdownMenu}>
								<div className={styles.menuContent}>
									<p className={styles.itemMenu}>My Profile</p>
									<p className={styles.itemMenu}>Orders</p>
									<p className={styles.itemMenu}>Logout</p>
								</div>
							</div>
						)}
					</div>

					<Link
						to="/panier"
						className={styles.cartWrapper}
						aria-label="Voir le panier"
					>
						<FaCartArrowDown size={22} />
						<p className={styles.spanNum}>0</p>
					</Link>

					{/* Hamburger / Close */}
					<button
						type="button"
						onClick={toggleMenu}
						className={styles.menuButton}
						aria-label="Menu"
						aria-expanded={isMenuOpen}
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
				</div>
			</nav>
		</header>
	);
}
