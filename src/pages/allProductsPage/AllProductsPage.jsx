import { useState } from "react";
import useProductsPagination from "./hooks/useProductsPagination.jsx";
import Loader from "../../shared/components/loader/Loader.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import styles from "./styles/AllProductsPage.module.css";
import CategoryFilter from "./components/CategoryFilter.jsx";
import useAllCategories from "../allCategoriesPage/hooks/useAllCategories.jsx";
import ModalFilter from "./components/ModalFilter.jsx";
import { SlidersHorizontal} from "lucide-react";

export default function AllProductsPage() {
    const [page, setPage] = useState(1);
    const [selectedCategories,  setSelectedCategories] = useState([]);
    const [appliedCategories, setAppliedCategories] = useState([]);
    const { products, totalPages, loading } = useProductsPagination(page, 25, appliedCategories);
    const [modalState, setModalState] = useState("closed")

    const {categories: allCategories, loading: loadingCategories} = useAllCategories();

    const closeModal = () => {
        setModalState("exiting");
        setTimeout(() => setModalState("closed"), 200);
    }

    if (loading || loadingCategories) return <Loader />;

    return (
        <div>
            <h2 className={styles.pageTitle}>Liste des produits</h2>
            <div className={styles.pageContainer}>
                <aside className={`${styles.sidebar} ${styles.desktopOnly}`}>
                    <h3>Filtres</h3>
                    <CategoryFilter
                        categories={allCategories}
                        selected={selectedCategories}
                        onChange={setSelectedCategories}
                        onApply={() => {
                            setAppliedCategories(selectedCategories);
                            setPage(1);
                        }}
                    />
                </aside>

                <div className={styles.mobileOnly}>
                    <button
                        className={styles.filterButton}
                        onClick={() => setModalState("entering")}
                    >
                        <SlidersHorizontal size={20} />
                        <span>Filtrer</span>
                    </button>
                    {modalState !== "closed" && (
                        <ModalFilter onClose={() => closeModal()}>
                            <div className={modalState === "entering" ? styles.modalEnter : styles.modalExit}>
                                <CategoryFilter
                                    categories={allCategories}
                                    selected={selectedCategories}
                                    onChange={setSelectedCategories}
                                    onApply={() => {
                                        setAppliedCategories(selectedCategories);
                                        setPage(1);
                                        closeModal();
                                    }}
                                />
                            </div>
                        </ModalFilter>
                    )}
                </div>

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
