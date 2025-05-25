import styles from './styles/HomePage.module.css'
import useHomeData from "./hooks/useHomeData.jsx";
import CategoryGrid from "./components/CategoryGrid.jsx";
import NewProductCarousel from "./components/NewProductCarousel.jsx";

export default function HomePage() {
    const {categories, newProducts, error, loading } = useHomeData();

    return (
        <div className={styles.container}>
            <h1 className='home-page-title'>Home</h1>
            <div className={styles.row}>
                <div className={styles.carousel}>
                    <NewProductCarousel products={newProducts} />
                </div>
                <div className={styles.categoryGrid}>
                    <CategoryGrid categories={categories} />
                </div>
            </div>
        </div>
    )
}
