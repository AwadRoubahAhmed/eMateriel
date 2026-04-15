"use client";

import { useEffect, useState } from "react";
import { FaCartArrowDown, FaUserAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/eMatériel.png";
import NavList from "../ui/navList/NavList";
import styles from "./Navbar.module.css";
import ApiOrdersService from "../../services/api_orders_service";
import ApiLineOrderService from "../../services/api_line_order_service";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
	const { user } = useAuth();
	const navigate = useNavigate();

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [cartCount, setCartCount] = useState(0);

	const toggleMenu = () => setIsMenuOpen((prev) => !prev);
	const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

	// 🛒 Charger compteur panier
	useEffect(() => {
		const fetchCart = async () => {
			if (!user) {
				setCartCount(0);
				return;
			}

			try {
				const ordersService = new ApiOrdersService();
				const lineService = new ApiLineOrderService();

				const ordersRes = await ordersService.selectAll();
				const linesRes = await lineService.selectAll();

				const order = ordersRes.data?.find(
					(o) => o.user_id === user.id
				);

				if (!order) {
					setCartCount(0);
					return;
				}

				const userLines =
					linesRes.data?.filter(
						(line) => line.order_id === order.id
					) ?? [];

				// total qty (pas nombre lignes)
				setCartCount(
					userLines.reduce((sum, l) => sum + (l.qty ?? 0), 0)
				);
			} catch (err) {
				console.error(err);
				setCartCount(0);
			}
		};

		fetchCart();
	}, [user]);

	// bloque scroll menu mobile
	useEffect(() => {
		document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
	}, [isMenuOpen]);

	const handleDropdownNavigation = (path: string) => {
		setIsDropdownOpen(false);
		setIsMenuOpen(false);
		navigate(path);
	};

	return (
		<header className={styles.header}>
			<nav className={styles.navbar} aria-label="Navigation principale">

				{/* LOGO */}
				<Link to="/" className={styles.logoWrapper}>
					<img src={logo} alt="eMatériel" className={styles.logo} />
				</Link>

				{/* MENU */}
				<NavList
					isMenuOpen={isMenuOpen}
					closeMenu={() => setIsMenuOpen(false)}
					
				/>

				{/* ICONS */}
				<div className={styles.icons}>

					{/* 🛒 PANIER CLEAN */}
					<Link
						to="/panier"
						className={styles.cartWrapper}
						aria-label="Voir le panier"
					>
						<FaCartArrowDown size={22} />

						{cartCount > 0 && (
							<span className={styles.spanNum}>
								{cartCount}
							</span>
						)}
					</Link>

					{/* USER */}
					<div className={styles.dropdownWrapper}>
						<button
							type="button"
							className={styles.dropdownButton}
							onClick={toggleDropdown}
						>
							<FaUserAlt size={22} />
						</button>

						{isDropdownOpen && (
							<div className={styles.dropdownMenu}>
								<div className={styles.menuContent}>
									<button
										onClick={() =>
											handleDropdownNavigation("/auth")
										}
									>
										Se connecter
									</button>
								</div>
							</div>
						)}
					</div>

					{/* HAMBURGER */}
					<button
						type="button"
						onClick={toggleMenu}
						className={styles.menuButton}
					>
						{isMenuOpen ? (
							<IoCloseSharp size={28} />
						) : (
							<GiHamburgerMenu size={28} />
						)}
					</button>

				</div>
			</nav>
		</header>
	);
}