import useAllCategories from "./hooks/useAllCategories";
import Loader from "../../shared/components/loader/Loader";
import styles from "./styles/AllCategoriesPage.module.css";
import { Link } from "react-router-dom";
import categoryImages from "../../assets/categoryImages";

export default function AllCategoriesPage() {
    const { categories, loading, error } = useAllCategories();

    if (loading || !categories) return <Loader />;
    if (error) return <p>Erreur lors du chargement des catégories.</p>;

    return (
        <div className={styles.pageContainer}>
            <h2 className={styles.pageTitle}>Toutes les catégories</h2>
            <div className={styles.grid}>
                {categories.map(({ slug, name }) => {
                    const imageSrc = categoryImages[slug];

                    return (
                        <div key={slug} className={styles.gridItem}>
                            {imageSrc ? (
                                <Link to={`/category/${slug}`} className={styles.link}>
                                    <div
                                        className={styles.image}
                                        style={{ backgroundImage: `url(${imageSrc})` }}
                                        aria-label={name}
                                    >
                                        <span className={styles.categoryName}>{name}</span>
                                    </div>
                                </Link>
                            ) : (
                                <Link to={`/category/${slug}`} className={styles.link}>
                                    <div className={styles.noImage}>
                                        <span className={styles.categoryName}>{name}</span>
                                    </div>
                                </Link>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
