import React from 'react';
import styles from '../styles/HomePage.module.css';
import CategoryCard from './CategoryCard';

export default function CategoryGrid ({ categories }) {
    let count = 0;
    return (
        <section className={styles.categoryGrid}>
            {categories.map(cat => (
                <CategoryCard key={count++} category={cat} />
            ))}
        </section>
    );
};
