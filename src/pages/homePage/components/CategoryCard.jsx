import styles from '../styles/CategoryCard.module.css'
import styles2 from '../../../shared/components/buttons/Button.module.css'
import Button from "../../../shared/components/buttons/Button.jsx";

export default function CategoryCard({category}) {
    return (
        <div className={styles.categoryCard} style={{gridArea: category.gridArea}}>
            <img src={category.image} alt={category.name} className={styles.categoryImage}/>
            <div className={styles.categoryContent}>
                <h2 className={styles.categoryTitle}>{category.name}</h2>
                <Button className={styles2.showMoreBtn} to={`/category/${category.slug}`}>Voir plus</Button>
            </div>
        </div>
    )
}
