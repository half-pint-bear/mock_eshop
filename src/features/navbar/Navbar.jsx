import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useNavbar } from './useNavbar';

const Navbar = () => {
    const { isOpen, toggleMenu, closeMenu } = useNavbar();

    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.logoLink}>
                Mock eShop
            </NavLink>

            <div className={styles.burger} onClick={toggleMenu}>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </div>

            <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
                <li>
                    <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ''}>
                        Accueil
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/produits" onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ''}>
                        Produits
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ''}>
                        Contact
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
