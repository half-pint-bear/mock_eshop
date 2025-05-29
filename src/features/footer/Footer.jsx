import React from 'react';
import styles from './Footer.module.css';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.column}>
                <h2 className={styles.siteName}>Mock eShop</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel urna at est feugiat blandit.</p>
            </div>

            <div className={styles.column}>
                <h3>Liens rapides</h3>
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/products">Produits</a></li>
                    <li><a href="/about">À propos</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>

            <div className={styles.column}>
                <h3>Mon compte</h3>
                <ul>
                    <li><a href="/account">Mon compte</a></li>
                    <li><a href="/orders">Mes commandes</a></li>
                    <li><a href="/cart">Mon panier</a></li>
                    <li><a href="/login">Connexion</a></li>
                </ul>
            </div>

            <div className={styles.column}>
                <h3>Newsletter</h3>
                <form className={styles.newsletterForm} onSubmit={e => e.preventDefault()}>
                    <input type="email" placeholder="Votre email" required />
                    <button type="submit"><Mail size={18} /></button>
                </form>
                <div className={styles.socialIcons}>
                    <a href="#"><Facebook /></a>
                    <a href="#"><Twitter /></a>
                    <a href="#"><Instagram /></a>
                </div>
            </div>
        </footer>
    );
}
