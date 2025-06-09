import styles from './styles/HomePage.module.css'
import useHomeData from "./hooks/useHomeData.jsx";
import CategoryGrid from "./components/CategoryGrid.jsx";
import TopProductCarousel from "./components/TopProductCarousel.jsx";
import Loader from "../../shared/components/loader/Loader.jsx";
import banner from "../../assets/banner-1.jpg"

export default function HomePage() {
    const {categories, topProducts, error, loading } = useHomeData();

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <div>
                <CategoryGrid categories={categories} />
            </div>

            <div className={styles.carousel}>
                <h2 className={styles.topSalesTitle}>Top sales</h2>
                <TopProductCarousel products={topProducts} />
            </div>
            <div className={styles.banner}>
                <img src={banner}  alt={"bannière"}/>
                <h3>Des offres incroyables toute l'année</h3>
            </div>
        </div>
    )
}
