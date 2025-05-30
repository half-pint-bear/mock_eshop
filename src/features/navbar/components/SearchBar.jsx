import styles from '../styles/SearchBar.module.css';
import {useState} from "react";
import useSearchBar from "../hooks/useSearchBar.jsx";

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const {results, loading} = useSearchBar(query);

    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                placeholder="Rechercher un article"
                className={styles.searchInput}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {loading && <div className={styles.spinner}></div>}

            {Array.isArray(results) && results.length > 0 && (
                <ul className={styles.dropdown}>
                    { results.map((product) =>
                        <li key={product.id} className={styles.dropdownItem}><a href={"/products/" + product.id}>{product.title}</a></li>
                    )}
                </ul>
            )}
        </div>
    )
}
