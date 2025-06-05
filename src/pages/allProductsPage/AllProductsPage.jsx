import { useState } from "react";
import useProductsPagination from "./hooks/useProductsPagination.jsx";
import Loader from "../../shared/components/loader/Loader.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import styles from "./styles/AllProductsPage.module.css";
import CategoryFilter from "./components/CategoryFilter.jsx";
import useAllCategories from "../allCategoriesPage/hooks/useAllCategories.jsx";

export default function AllProductsPage() {
    const [page, setPage] = useState(1);
    const [selectedCategories,  setSelectedCategories] = useState([]);
    const { products, totalPages, loading } = useProductsPagination(page, 25, selectedCategories);

    const {categories: allCategories, loading: loadingCategories} = useAllCategories();

    if (loading || loadingCategories) return <Loader />;

    return (
        <div>
            <h2 className={styles.pageTitle}>Liste des produits</h2>
            <div className={styles.pageContainer}>
                <aside className={styles.sidebar}>
                    <h3>Filtres</h3>
                    <CategoryFilter
                        categories={allCategories}
                        selected={selectedCategories}
                        onChange={(newSelected) => {
                            setSelectedCategories(newSelected);
                            setPage(1);
                        }}
                    />
                </aside>

                <main className={styles.mainContent}>

                    <ProductGrid products={products} />

                    <div className={styles.pagination}>
                        <button
                            onClick={() => setPage(prev => Math.max(1, prev - 1))}
                            disabled={page === 1}
                        >
                            Précédent
                        </button>
                        <span>Page {page} sur {totalPages}</span>
                        <button
                            onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={page === totalPages}
                        >
                            Suivant
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
