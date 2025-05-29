import styles from '../styles/CategoryCard.module.css'
import styles2 from '../../../shared/buttons/Button.module.css'
import Button from "../../../shared/buttons/Button.jsx";

export default function CategoryCard({category}) {
    return (
        <div className={styles.categoryCard}>
            <h2 className={styles.categoryTitle}>{category.name}</h2>
            <Button className={styles2.showMoreBtn} to={`/category/${category.slug}`}>Voir plus</Button>
        </div>
    )
}
