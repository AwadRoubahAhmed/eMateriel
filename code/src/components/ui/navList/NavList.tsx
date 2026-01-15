import { Link } from "react-router-dom"
import styles from "./NavList.module.css"

export default function NavList() {
    return (
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
                <li>
                    <Link className={styles.menu} to={"/admin"}>
                        Admin
                    </Link>
                </li>
            </ul>
        </div>
    )
}
