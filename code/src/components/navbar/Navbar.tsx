import { FaSearch, FaUserAlt } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";

import { Link } from "react-router-dom";
import logo from "../../assets/images/eMatériel.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
	return (
		<header>
			<nav className={styles.navbar}>
				<div>
					<Link to={"/"}>
						<img className={styles.logo} src={logo} alt="logo eMatériel" />
					</Link>
				</div>
				<div className={styles.navigation}>
					<ul className={styles.navLinks}>
						<li>
							<Link className={styles.menu} to={"/"}>
								Accueil
							</Link>
						</li>
						<li>
							<Link className={styles.menu} to={"/products"}>
								Produits
							</Link>
						</li>
						<li>
							<Link className={styles.menu} to={"/contact"}>
								Contact
							</Link>
						</li>
						<li>
							<Link className={styles.menu} to={"/apropos"}>
								A propos
							</Link>
						</li>
					</ul>
				</div>
				<div className={styles.group}>
					<input
						className={styles.input}
						type="search"
						placeholder="Rechercher..."
					/>

					<FaSearch className={styles.search_icon} />
				</div>
				<div className={styles.icons}>
					<div>
						<FaCartArrowDown size={24} />
					</div>
					<div>
						<FaUserAlt size={24} />
					</div>
				</div>
			</nav>
		</header>
	);
}
