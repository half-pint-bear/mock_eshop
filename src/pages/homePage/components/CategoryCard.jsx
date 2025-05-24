import styles from '../styles/HomePage.module.css'

export default function CategoryCard({category}) {
    return (
        <div className={styles.categoryCard}>
            <h4>{category.name}</h4>
        </div>
    )
}
