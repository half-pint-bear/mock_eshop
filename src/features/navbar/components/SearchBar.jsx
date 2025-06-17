import styles from '../styles/SearchBar.module.css';
import {useEffect, useRef, useState} from "react";
import useSearchBar from "../hooks/useSearchBar.jsx";

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const {results, loading} = useSearchBar(query);
    const searchRef = useRef(null);

    // Fermer la dropdown si on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setIsOpen(true);
    };

    const handleItemClick = () => {
        setIsOpen(false); // Ferme la dropdown
        setQuery('');     // Optionnel : vide le champ
    };

    return (
        <div className={styles.searchContainer} ref={searchRef}>
            <input
                type="text"
                placeholder="Rechercher un article"
                className={styles.searchInput}
                value={query}
                onChange={handleInputChange}
            />

            {loading && <div className={styles.spinner}></div>}

            {isOpen && Array.isArray(results) && results.length > 0 && (
                <ul className={styles.dropdown}>
                    {results.map((product) => (
                        <li key={product.id} className={styles.dropdownItem}>
                            <a href={`/products/${product.id}`} onClick={handleItemClick}>
                                {product.title}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
