import React from 'react';
import styles from '../styles/HomePage.module.css';
import CategoryCard from './CategoryCard';

export default function CategoryGrid ({ categories }) {
    return (
        <section className={styles.categoryGrid}>
            {categories.map(cat => (
                <CategoryCard key={cat.id} category={cat} />
            ))}
        </section>
    );
};
