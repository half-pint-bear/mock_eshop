import React from 'react';
import { ShoppingCart } from 'lucide-react';
import styles from '../styles/Navbar.module.css';

export default function CartIcon() {
    return (
        <button className={styles.iconButton} aria-label="Panier">
            <ShoppingCart size={24} />
        </button>
    );
}
