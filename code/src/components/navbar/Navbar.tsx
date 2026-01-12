import { FaUserAlt } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";

import { Link } from "react-router-dom";
import logo from "../../assets/images/eMatériel.png";
import styles from "./Navbar.module.css";
import NavList from "../ui/navList/NavList";
import Search from "../ui/search/Search";

export default function Navbar() {
	return (
		<header>
			<nav className={styles.navbar}>
				<div>
					<Link to={"/"}>
						<img className={styles.logo} src={logo} alt="logo eMatériel" />
					</Link>
				</div>
				<NavList />
				<Search />
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
