"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiMenu, FiShoppingBag, FiUser, FiX } from "react-icons/fi";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.webp";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { cartCount } from "../../services/cart_service";
import { isAdmin, logout } from "../../services/security_service";
import styles from "./Navbar.module.css";

const LINKS = [
	{ to: "/", label: "Accueil", end: true },
	{ to: "/products", label: "Nos produits", end: false },
	{ to: "/apropos", label: "À propos", end: true },
	{ to: "/contact", label: "Contact", end: true },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
	isActive ? `${styles.link} ${styles.active}` : styles.link;

export default function Navbar() {
	const { session } = useAuth();
	const count = cartCount(useCart());
	const navigate = useNavigate();
	const location = useLocation();

	const [menuOpen, setMenuOpen] = useState(false);
	const [accountOpen, setAccountOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const accountRef = useRef<HTMLDivElement>(null);
	const burgerRef = useRef<HTMLButtonElement>(null);

	// menus refermés à chaque changement de page
	// biome-ignore lint/correctness/useExhaustiveDependencies: déclenché par la navigation
	useEffect(() => {
		setMenuOpen(false);
		setAccountOpen(false);
	}, [location.pathname]);

	// ombre sous la barre dès que la page défile
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// menu mobile ouvert : page bloquée derrière, Échap pour fermer
	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		if (!menuOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setMenuOpen(false);
				burgerRef.current?.focus();
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [menuOpen]);

	// menu du compte : clic extérieur ou Échap pour fermer
	useEffect(() => {
		if (!accountOpen) return;
		const onClick = (e: MouseEvent) => {
			if (!accountRef.current?.contains(e.target as Node)) setAccountOpen(false);
		};
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAccountOpen(false);
		document.addEventListener("click", onClick);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("click", onClick);
			document.removeEventListener("keydown", onKey);
		};
	}, [accountOpen]);

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const accountLinks = session ? (
		<>
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
	);

	return (
		<header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
			<nav className={styles.navbar} aria-label="Navigation principale">
				<Link to="/" className={styles.brand} aria-label="eMatériel, accueil">
					<img src={logo} alt="" width="40" height="40" className={styles.logo} />
					<span className={styles.brandName}>eMatériel</span>
				</Link>

				{/* liens : en ligne sur ordinateur, tiroir latéral sur tablette et mobile */}
				<div id="main-menu" className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}>
					<ul className={styles.links}>
						{LINKS.map(({ to, label, end }) => (
							<li key={to}>
								<NavLink to={to} end={end} className={linkClass}>
									{label}
								</NavLink>
							</li>
						))}
					</ul>
					<div className={styles.drawerAccount}>
						<p className={styles.drawerTitle}>{session ? session.user.email : "Mon compte"}</p>
						{accountLinks}
					</div>
				</div>

				<div className={styles.actions}>
					<Link
						to="/panier"
						className={styles.iconButton}
						aria-label={count > 0 ? `Panier, ${count} article(s)` : "Panier vide"}
					>
						<FiShoppingBag aria-hidden="true" />
						{count > 0 && (
							<span className={styles.badge} aria-hidden="true">
								{count > 99 ? "99+" : count}
							</span>
						)}
					</Link>

					<div className={styles.account} ref={accountRef}>
						<button
							type="button"
							className={styles.accountButton}
							aria-expanded={accountOpen}
							aria-controls="account-menu"
							onClick={() => setAccountOpen((open) => !open)}
						>
							<FiUser aria-hidden="true" />
							<span className={styles.accountLabel}>{session ? "Mon compte" : "Connexion"}</span>
							<FiChevronDown aria-hidden="true" className={accountOpen ? styles.chevronOpen : styles.chevron} />
						</button>
						{accountOpen && (
							<div className={styles.dropdown} id="account-menu">
								{session && <p className={styles.dropdownEmail}>{session.user.email}</p>}
								{accountLinks}
							</div>
						)}
					</div>

					<button
						ref={burgerRef}
						type="button"
						className={`${styles.iconButton} ${styles.burger}`}
						onClick={() => setMenuOpen((open) => !open)}
						aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
						aria-expanded={menuOpen}
						aria-controls="main-menu"
					>
						{menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
					</button>
				</div>
			</nav>

			{menuOpen && (
				<button
					type="button"
					className={styles.overlay}
					aria-label="Fermer le menu"
					tabIndex={-1}
					onClick={() => setMenuOpen(false)}
				/>
			)}
		</header>
	);
}
