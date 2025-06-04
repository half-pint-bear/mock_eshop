import styles from './styles/HomePage.module.css'
import useHomeData from "./hooks/useHomeData.jsx";
import CategoryGrid from "./components/CategoryGrid.jsx";
import TopProductCarousel from "./components/TopProductCarousel.jsx";
import Loader from "../../shared/components/loader/Loader.jsx";

export default function HomePage() {
    const {categories, topProducts, error, loading } = useHomeData();

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div className={styles.container}>

                <div>
                    <CategoryGrid categories={categories} />
                </div>

            <div className={styles.carousel}>
                <h2 className={styles.topSalesTitle}>Top sales</h2>
                <TopProductCarousel products={topProducts} />
            </div>
        </div>
    )
}
