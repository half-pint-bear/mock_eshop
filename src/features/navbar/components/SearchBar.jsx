import styles from '../styles/SearchBar.module.css';

export default function SearchBar() {
    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                placeholder="Rechercher un article"
                className={styles.searchInput}
            />
        </div>
    )
}
