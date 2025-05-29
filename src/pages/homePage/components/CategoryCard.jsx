import styles from '../styles/CategoryCard.module.css'
import ShowMoreBtn from "../../../shared/buttons/ShowMoreBtn.jsx";

export default function CategoryCard({category}) {
    return (
        <div className={styles.categoryCard}>
            <h2 className={styles.categoryTitle}>{category.name}</h2>
            <ShowMoreBtn to={`/category/${category.slug}`}>Voir plus</ShowMoreBtn>
        </div>
    )
}
