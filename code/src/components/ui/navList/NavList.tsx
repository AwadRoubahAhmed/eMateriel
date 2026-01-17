import { Link } from "react-router-dom";
import styles from "./NavList.module.css";

type NavListProps = {
    isMenuOpen: boolean;
    // closeMenu: () => void
}

export default function NavList({ isMenuOpen }: NavListProps) {
    return (
        <ul
            className={`${styles.navList} ${isMenuOpen ? styles.mobileOpen : ""
                }`}
        >
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/produits">Produits</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/apropos">À propos</Link></li>
        </ul>
    );
}

