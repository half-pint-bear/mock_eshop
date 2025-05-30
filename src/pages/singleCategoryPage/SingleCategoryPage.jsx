import {useParams} from "react-router-dom";
import useCategoryBySlug from "./hooks/useCategoryBySlug.jsx";
import Loader from "../../shared/components/loader/Loader.jsx";
import styles from "./styles/SingleCategoryPage.module.css"
import ProductCard from "./components/ProductCard.jsx";

export default function SingleCategoryPage() {
    const {slug} = useParams();
    const {products, loading, cat} = useCategoryBySlug(slug);

    if (!products)
        return <Loader />

    return (
        <div>
            <h1 className={styles.title}>{cat}</h1>
            {loading ? (
                <Loader />
            ) : (
                <ul className={styles.list}>
                    {products.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </ul>
            )}
        </div>)
}
