"use client";

import { NavLink, Outlet } from "react-router-dom";
import RequireAuth from "../components/auth/RequireAuth";
import Navbar from "../components/navbar/Navbar";
import styles from "./admin_layout.module.css";

const LINKS = [
	{ to: "/admin", label: "Tableau de bord", end: true },
	{ to: "/admin/orders", label: "Commandes" },
	{ to: "/admin/products", label: "Produits et stock" },
	{ to: "/admin/categories", label: "Catégories" },
	{ to: "/admin/users", label: "Utilisateurs" },
	{ to: "/admin/messages", label: "Messages" },
];

export default function AdminLayout() {
	return (
		<>
			<title>Administration | eMatériel</title>
			<meta name="robots" content="noindex, nofollow" />
			<Navbar />
			<RequireAuth admin>
				<div className={`shell ${styles.wrapper}`}>
					<nav className={styles.sidebar} aria-label="Administration">
						<ul>
							{LINKS.map(({ to, label, end }) => (
								<li key={to}>
									<NavLink
										to={to}
										end={end}
										className={({ isActive }) => (isActive ? styles.active : undefined)}
									>
										{label}
									</NavLink>
								</li>
							))}
						</ul>
					</nav>
					<main id="main-content" className={styles.main}>
						<Outlet />
					</main>
				</div>
			</RequireAuth>
		</>
	);
}
