import { useState, useEffect } from "react";
import styles from "../styles/CategoryFilter.module.css";

export default function CategoryFilter({ categories, selected, onChange }) {
    const [showAll, setShowAll] = useState(false);
    const [localSelected, setLocalSelected] = useState([]);

    useEffect(() => {
        setLocalSelected(selected); // sync avec props
    }, [selected]);

    const toggleCategory = (category) => {
        setLocalSelected((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const displayedCategories = showAll ? categories : categories.slice(0, 4);

    return (
        <div>
            <h3>Catégories</h3>
            <ul className={styles.list}>
                {displayedCategories.map((categoryObj) => {
                    const category = typeof categoryObj === "string" ? categoryObj : categoryObj.name;
                    return (
                        <li key={category}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={localSelected.includes(category)}
                                    onChange={() => toggleCategory(category)}
                                />
                                {category}
                            </label>
                        </li>
                    );
                })}
            </ul>

            {categories.length > 3 && (
                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={() => setShowAll((prev) => !prev)}
                >
                    {showAll ? "Voir moins" : "Voir plus"}
                </button>
            )}

            <div style={{ marginTop: "1rem" }}>
                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={() => onChange(localSelected)}
                >
                    Appliquer les filtres
                </button>
            </div>
        </div>
    );
}
