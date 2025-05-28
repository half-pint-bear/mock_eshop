import styles from './styles/HomePage.module.css'
import useHomeData from "./hooks/useHomeData.jsx";
import CategoryGrid from "./components/CategoryGrid.jsx";
import TopProductCarousel from "./components/TopProductCarousel.jsx";
import Loader from "../../shared/loader/Loader.jsx";

export default function HomePage() {
    const {categories, newProducts, error, loading } = useHomeData();

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div className={styles.container}>
            <h1 className='home-page-title'>Home</h1>
            <div className={styles.row}>
                <div className={styles.categoryGrid}>
                    <CategoryGrid categories={categories} />
                </div>
            </div>
            <div className={styles.carousel}>
                <h2>Top sales</h2>
                <TopProductCarousel products={newProducts} />
            </div>
        </div>
    )
}
