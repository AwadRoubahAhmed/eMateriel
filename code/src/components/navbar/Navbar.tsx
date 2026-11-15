"use client";

import { useEffect, useRef, useState } from "react";
import { FaCartArrowDown, FaUserAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.webp";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { cartCount } from "../../services/cart_service";
import { isAdmin, logout } from "../../services/security_service";
import NavList from "../ui/navList/NavList";
import styles from "./Navbar.module.css";

export default function Navbar() {
	const { session } = useAuth();
	const count = cartCount(useCart());
	const navigate = useNavigate();
	const location = useLocation();

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// fermer les menus à chaque changement de page
	// biome-ignore lint/correctness/useExhaustiveDependencies: déclenché par la navigation
	useEffect(() => {
		setIsMenuOpen(false);
		setIsDropdownOpen(false);
	}, [location.pathname]);

	// bloque le défilement derrière le menu mobile
	useEffect(() => {
		document.body.style.overflow = isMenuOpen ? "hidden" : "";
	}, [isMenuOpen]);

	// fermer le menu du compte au clic extérieur ou avec Échap
	useEffect(() => {
		if (!isDropdownOpen) return;
		const onClick = (e: MouseEvent) => {
			if (!dropdownRef.current?.contains(e.target as Node)) setIsDropdownOpen(false);
		};
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsDropdownOpen(false);
		document.addEventListener("click", onClick);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("click", onClick);
			document.removeEventListener("keydown", onKey);
		};
	}, [isDropdownOpen]);

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<header className={styles.header}>
			<nav className={styles.navbar} aria-label="Navigation principale">
				<Link to="/" className={styles.logoWrapper}>
					<img src={logo} alt="eMatériel, retour à l'accueil" className={styles.logo} />
				</Link>

				<NavList isMenuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />

				<div className={styles.icons}>
					<Link
						to="/panier"
						className={styles.cartWrapper}
						aria-label={count > 0 ? `Panier, ${count} article(s)` : "Panier vide"}
					>
						<FaCartArrowDown size={22} aria-hidden="true" />
						{count > 0 && (
							<span className={styles.spanNum} aria-hidden="true">
								{count}
							</span>
						)}
					</Link>

					<div className={styles.dropdownWrapper} ref={dropdownRef}>
						<button
							type="button"
							className={styles.dropdownButton}
							aria-label="Mon compte"
							aria-expanded={isDropdownOpen}
							aria-controls="account-menu"
							onClick={() => setIsDropdownOpen((open) => !open)}
						>
							<FaUserAlt size={22} aria-hidden="true" />
						</button>

						{isDropdownOpen && (
							<div className={styles.dropdownMenu} id="account-menu">
								<div className={styles.menuContent}>
									{session ? (
										<>
											<span className={styles.menuEmail}>{session.user.email}</span>
											<Link to="/mes-commandes">Mes commandes</Link>
											{isAdmin(session) && <Link to="/admin">Administration</Link>}
											<button type="button" onClick={handleLogout}>
												Se déconnecter
											</button>
										</>
									) : (
										<>
											<Link to="/auth">Se connecter</Link>
											<Link to="/auth?mode=register">Créer un compte</Link>
										</>
									)}
								</div>
							</div>
						)}
					</div>

					<button
						type="button"
						onClick={() => setIsMenuOpen((open) => !open)}
						className={styles.menuButton}
						aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
						aria-expanded={isMenuOpen}
					>
						{isMenuOpen ? (
							<IoCloseSharp size={28} aria-hidden="true" />
						) : (
							<GiHamburgerMenu size={28} aria-hidden="true" />
						)}
					</button>
				</div>
			</nav>
		</header>
	);
}
