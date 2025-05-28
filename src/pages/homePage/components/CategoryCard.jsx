import styles from '../styles/HomePage.module.css'
import ShowMoreBtn from "../../../shared/buttons/ShowMoreBtn.jsx";

export default function CategoryCard({category}) {
    return (
        <div className={styles.categoryCard}>
            <h2>{category.name}</h2>
            <ShowMoreBtn to={`/category/${category.slug}`}>Voir plus</ShowMoreBtn>
        </div>
    )
}
