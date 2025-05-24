import styles from './styles/HomePage.module.css'
import useHomeData from "./hooks/useHomeData.jsx";
import CategoryGrid from "./components/CategoryGrid.jsx";
import NewProductCarousel from "./components/NewProductCarousel.jsx";

export default function HomePage() {
    const {categories, newProducts, error, loading } = useHomeData();

    return (
        <main className={styles.container}>
            <h1 className='home-page-title'>Home</h1>
            <NewProductCarousel products={newProducts} />
            <CategoryGrid categories={categories} />
        </main>
    )
}
