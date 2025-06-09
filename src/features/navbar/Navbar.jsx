import React, {useEffect, useRef, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import styles from './styles/Navbar.module.css';
import { useNavbar } from './hooks/useNavbar.jsx';
import NavLinks from "./components/NavLinks.jsx";
import SearchBar from "./components/SearchBar.jsx";
import AccountIcon from "./components/AccountIcon.jsx";
import CartPreview from "./components/CartPreview.jsx";
import CartIcon from "./components/CartIcon.jsx";

export default function Navbar() {

    const { isOpen, toggleMenu, closeMenu } = useNavbar();
    const [showSearch, setShowSearch] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const cartRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(cartRef.current && !cartRef.current.contains(e.target)) {
                setCartOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    })

    return (
        <nav className={styles.navbar}>
            <div className={styles.leftSection}>
                <div className={styles.burger} onClick={toggleMenu}>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </div>
                <NavLink to="/" className={styles.logoLink}>
                    Mock eShop
                </NavLink>

                <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
                    <NavLinks closeMenu={closeMenu} />
                </ul>
            </div>

            {/* Desktop searchbar */}
            <div className={styles.desktopSearch}>
                <SearchBar />
            </div>

            {/* Icons at right */}
            <div className={styles.iconGroup}>
                {/* Mobile search icon */}
                <button className={styles.searchIcon} onClick={() => setShowSearch(true)}>
                    <Search size={20} />
                </button>
                <div ref={cartRef}>
                    <CartIcon onClick={() => setCartOpen(prev => !prev)} />
                    <CartPreview open={cartOpen} closePreview={() => setCartOpen(false)} />
                </div>
                <AccountIcon className={styles.iconButton}/>
            </div>

            {/* Overlay search (mobile only) */}
            {showSearch && (
                <div className={styles.searchOverlay}>
                    <button className={styles.closeSearch} onClick={() => setShowSearch(false)}>
                        <X size={24} color="white" />
                    </button>
                    <SearchBar />
                </div>
            )}
        </nav>
    );
}
