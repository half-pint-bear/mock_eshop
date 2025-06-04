import React from 'react';
import styles from '../styles/HomePage.module.css';
import CategoryCard from './CategoryCard';

export default function CategoryGrid ({ categories }) {
    const gridAreas = ["card1", "card2", "card3", "card4", "card5"];


    return (
        <div className={styles.categoryGrid}>
            {categories.slice(0, 5).map((cat, i) => (
                <CategoryCard
                    key={i}
                    category={{ ...cat, gridArea: gridAreas[i] }}
                />
            ))}
        </div>
    );
};
