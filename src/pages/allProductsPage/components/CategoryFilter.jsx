import { useState, useMemo } from "react";
import styles from "../styles/CategoryFilter.module.css";

export default function CategoryFilter({ categories, selected, onChange, onApply }) {
    const [showAll, setShowAll] = useState(false);
    const [search, setSearch] = useState("");

    const filteredCategories = useMemo(() => {
        return categories.filter((c) =>
            c.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [categories, search]);

    const displayedCategories = showAll ? filteredCategories : filteredCategories.slice(0, 4);

    const toggleCategory = (category) => {
        if (selected.includes(category.slug)) {
            onChange(selected.filter((slug) => slug !== category.slug));
        } else {
            onChange([...selected, category.slug]);
        }
    };

    return (
        <div>
            <h3>Catégories</h3>
            <input
                type="text"
                className={styles.searchInput}
                placeholder="Rechercher une catégorie"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className={styles.listContainer}>
                <ul className={styles.list}>
                    {displayedCategories.map((category) => (
                        <li key={category.slug}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selected.includes(category.slug)}
                                    onChange={() => toggleCategory(category)}
                                />
                                {category.name}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            {filteredCategories.length > 4 && (
                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={() => setShowAll((prev) => !prev)}
                >
                    {showAll ? "Voir moins" : "Voir plus"}
                </button>
            )}
            {onApply && (
                <button
                    type="button"
                    className={styles.applyButton}
                    onClick={onApply}
                >
                    Appliquer les filtres
                </button>
            )}
        </div>
    );
}
