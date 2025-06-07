import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

export default function NavLinks({closeMenu}) {
    const links = [
        { to: '/', label: 'Accueil' },
        { to: '/products/all', label: 'Articles' },
        { to: '/categories/all', label: 'Catégories' },
    ];

    return (
        <>
            {links.map(({ to, label }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                        `${styles.navLink} ${isActive ? styles.active : styles.inactive}`
                    }
                    onClick={closeMenu}
                >
                    {label}
                </NavLink>
            ))}
        </>
    );
}
