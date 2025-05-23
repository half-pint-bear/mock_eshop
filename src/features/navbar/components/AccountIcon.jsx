// features/navbar/components/AccountIcon.jsx
import React from 'react';
import { User } from 'lucide-react';
import styles from '../styles/Navbar.module.css';

export default function AccountIcon() {
    return (
        <button className={styles.iconButton} aria-label="Compte">
            <User size={24} />
        </button>
    );
}
