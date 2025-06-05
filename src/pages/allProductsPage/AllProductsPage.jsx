import { useState } from "react";
import useProductsPagination from "./hooks/useProductsPagination.jsx";
import Loader from "../../shared/components/loader/Loader.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import styles from "./styles/AllProductsPage.module.css";

export default function AllProductsPage() {
    const [page, setPage] = useState(1);
    const { products, totalPages, loading } = useProductsPagination(page, 25);

    if (loading) return <Loader />;

    return (
        <div>
            <h2 className={styles.pageTitle}>Liste des produits</h2>
            <div className={styles.pageContainer}>
                <aside className={styles.sidebar}>
                    <h3>Filtres</h3>
                    <div>
                        <label>
                            <input type="checkbox" />
                            Prix moins de 50€
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" />
                            Stock disponible
                        </label>
                    </div>
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
