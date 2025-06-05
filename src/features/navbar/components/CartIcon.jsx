import React from 'react';
import { ShoppingCart } from 'lucide-react';
import styles from '../styles/Navbar.module.css';
import cartStyles from '../styles/CartIcon.module.css';
import {useCart} from "../../../contexts/CartContext.jsx";

export default function CartIcon({onClick}) {
    const { totalItems } = useCart();

    return (
        <button className={styles.iconButton} onClick={onClick} aria-label="Panier">
            <ShoppingCart size={24} />{totalItems > 0 && <span className={cartStyles.cartCount}>{totalItems}</span>}
        </button>
    );
}
