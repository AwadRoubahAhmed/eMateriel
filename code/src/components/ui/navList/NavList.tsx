import { NavLink, useNavigate } from "react-router-dom";
import SecurityService from "../../../services/security_service";
import styles from "./NavList.module.css";

type NavListProps = {
	isMenuOpen: boolean;
	closeMenu: () => void;
	onLogout?: () => void;
};

export default function NavList({
	isMenuOpen,
	closeMenu,
	onLogout,
}: NavListProps) {
	// const links = [
	// 	{ to: "/", label: "Accueil", end: true },
	// 	{ to: "/products", label: "Nos Produits" },
	// 	{ to: "/contact", label: "Contact" },
	// 	{ to: "/apropos", label: "À propos" },
	// 	// { to: "/admin", label: "Admin" },
	// ];
	const navigate = useNavigate();

	const handleLogout = () => {
		new SecurityService().logout();
		onLogout?.();
		closeMenu();
		navigate("/");
	};

	return (
		<ul className={`${styles.navList} ${isMenuOpen ? styles.mobileOpen : ""}`}>
			{/* {links.map(({ to, label, end }) => ( */}
			<li>
				<NavLink
					to={"/"}
					end={true}
					className={({ isActive }) =>
						isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
					}
					onClick={closeMenu}
				>
					Accueil
				</NavLink>
			</li>
			<li>
				<NavLink
					to={"/products"}
					end={true}
					className={({ isActive }) =>
						isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
					}
					onClick={closeMenu}
				>
					Nos Produits
				</NavLink>
			</li>
			<li>
				<NavLink
					to={"/contact"}
					end={true}
					className={({ isActive }) =>
						isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
					}
					onClick={closeMenu}
				>
					Contact
				</NavLink>
			</li>
			<li>
				<NavLink
					to={"/apropos"}
					end={true}
					className={({ isActive }) =>
						isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
					}
					onClick={closeMenu}
				>
					À propos
				</NavLink>
			</li>
			{new SecurityService().getUser()?.role.name === "Administrateur" ? (
				<li>
					<NavLink
						to={"/admin/dashboard"}
						end={true}
						className={({ isActive }) =>
							isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
						}
						onClick={closeMenu}
					>
						Admin
					</NavLink>
				</li>
			) : (
				<></>
			)}

			{new SecurityService().getUser() ? (
				<li>
					<NavLink
						to={"/"}
						end={true}
						className={({ isActive }) =>
							isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
						}
						onClick={handleLogout}
					>
						Deconnexion
					</NavLink>
				</li>
			) : (
				<></>
			)}
		</ul>
	);
}
