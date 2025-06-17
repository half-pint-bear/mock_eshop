import styles from '../styles/SearchBar.module.css';
import { useState, useEffect, useRef } from "react";
import useSearchBar from "../hooks/useSearchBar.jsx";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const { results, loading } = useSearchBar(query);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    // Open dropdown when results found
    useEffect(() => {
        setIsOpen(Array.isArray(results) && results.length > 0);
    }, [results]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleItemClick = (product) => {
        setIsOpen(false);
        setQuery('');
        navigate(`/products/${product.id}`);
    };

    return (
        <div className={styles.searchContainer} ref={containerRef}>
            <input
                type="text"
                placeholder="Rechercher un article"
                className={styles.searchInput}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {loading && <div className={styles.spinner}></div>}

            {isOpen && (
                <ul className={styles.dropdown}>
                    {results.map((product) => (
                        <li
                            key={product.id}
                            className={styles.dropdownItem}
                            onClick={() => handleItemClick(product)}
                        >
                            {product.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
