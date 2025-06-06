import useAllCategories from "./hooks/useAllCategories";
import Loader from "../../shared/components/loader/Loader";
import styles from "./styles/AllCategoriesPage.module.css";
import { Link } from "react-router-dom";

export default function AllCategoriesPage() {
    const { categories, loading, error } = useAllCategories();

    if (!categories || loading)
        return <Loader />;
    if (error)
        return <p>Erreur lors du chargement des catégories.</p>;
    return (
        <div className={styles.pageContainer}>
            <h2 className={styles.pageTitle}>Toutes les catégories</h2>
            <ul className={styles.categoryList}>
                {
                    categories.map((cat) => (
                    <li key={cat.slug}>
                        <Link to={`/products/categories/${cat}`} className={styles.categoryLink}>
                            {cat.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
