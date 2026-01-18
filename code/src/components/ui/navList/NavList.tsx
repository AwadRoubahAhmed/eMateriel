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
            <li role="none"><Link role="menuitem" to="/">Accueil</Link></li>
            <li role="none"><Link role="menuitem" to="/products">Produits</Link></li>
            <li role="none"><Link role="menuitem" to="/contact">Contact</Link></li>
            <li role="none"><Link role="menuitem" to="/apropos">À propos</Link></li>
            <li role="none"><Link role="menuitem" to="/admin">Admin</Link></li>
        </ul>
    );
}

