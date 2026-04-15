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
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [_refresh, setRefresh] = useState(0);
	const [cartCount, setCartCount] = useState(0);
	const [showEmptyCartMsg, setShowEmptyCartMsg] = useState(false);

	const { user } = useAuth();

	const navigate = useNavigate();

	const toggleMenu = () => setIsMenuOpen((prev) => !prev);
	const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

	// useEffect(() => {
	// 	const fetchCart = async () => {
	// 		try {
	// 			const ordersService = new ApiOrdersService();
	// 			const lineService = new ApiLineOrderService();

	// 			const ordersRes = await ordersService.selectAll();
	// 			const linesRes = await lineService.selectAll();

	// 			const order = ordersRes.data?.find(
	// 				(o) => o.user_id === null || o.user_id !== undefined
	// 			);

	// 			if (!order) {
	// 				setCartCount(0);
	// 				return;
	// 			}

	// 			const userLines =
	// 				linesRes.data?.filter(
	// 					(line) => line.order_id === order.id
	// 				) ?? [];

	// 			setCartCount(userLines.length);
	// 		} catch (err) {
	// 			console.error("Erreur panier navbar:", err);
	// 		}
	// 	};

	// 	fetchCart();
	// }, []);

	// Bloquer le scroll en mobile si menu ouvert

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

				setCartCount(userLines.reduce((sum, l) => sum + l.qty, 0));
			} catch (err) {
				console.error("Erreur panier navbar:", err);
			}
		};

		fetchCart();
	}, [user]);
	useEffect(() => {
		document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
	}, [isMenuOpen]);

	const handleDropdownNavigation = (path: string) => {
		setIsDropdownOpen(false);
		setIsMenuOpen(false);
		navigate(path);
	};

	const handleCartClick = () => {
		if (!user) {
			navigate("/auth");
			return;
		}

		if (cartCount === 0) {
			setShowEmptyCartMsg(true);

			setTimeout(() => {
				setShowEmptyCartMsg(false);
			}, 2000);

			return;
		}

		navigate("/panier");
	};

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
					onLogout={() => setRefresh((prev) => prev + 1)}
				/>

				{/* Icons */}
				<div className={styles.icons}>
					{/* <Link to="/panier" aria-label="Recherche">
						<FaSearch size={22} />
					</Link> */}
					<button
						type="button"
						onClick={handleCartClick}
						className={styles.cartWrapper}
						aria-label="Voir le panier"
					>
						<FaCartArrowDown size={22} />

						{cartCount > 0 && (
							<p className={styles.spanNum}>{cartCount}</p>
						)}
					</button>

					{/* Dropdown utilisateur */}
					<div className={styles.dropdownWrapper}>
						<button
							type="button"
							className={styles.dropdownButton}
							onClick={toggleDropdown}
							aria-haspopup="true"
							aria-expanded={isDropdownOpen}
						>
							<FaUserAlt size={22} />
						</button>

						{isDropdownOpen && (
							<div className={styles.dropdownMenu}>
								<div className={styles.menuContent}>
									<button
										type="button"
										className={styles.itemMenu}
										onClick={() => handleDropdownNavigation("/auth")}
									>
										Se connecter
									</button>
									{/* <button
										type="button"
										className={styles.itemMenu}
										onClick={() => handleDropdownNavigation("/auth")}
									>
										S’inscrire
									</button> */}
								</div>
							</div>
						)}
					</div>

					{/* <Link
						to="/panier"
						className={styles.cartWrapper}
						aria-label="Voir le panier"
					>
						<FaCartArrowDown size={22} />
						<p className={styles.spanNum}>0</p>
					</Link> */}

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
			{showEmptyCartMsg && (
				<div className={styles.cartToast}>
					Votre panier est vide 🛒
				</div>
			)}
		</header>
	);
}
