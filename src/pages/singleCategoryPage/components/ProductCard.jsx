import styles from "../styles/SingleCategoryPage.module.css";
import StarRating from "../../../shared/components/stars/StarRating.jsx";
import Button from "../../../shared/components/buttons/Button.jsx";
import btnStyles from "../../../shared/components/buttons/Button.module.css";
import useAverageRating from "../../../shared/hooks/useAverageRating.jsx";

export default function ProductCard({ product }) {
    const avgRating = useAverageRating(product.reviews);
console.log(avgRating);
    return (
        <li key={product.id} className={styles.li}>
            <img src={product.images[0]} className={styles.img} alt={product.title} />
            <h2>{product.title}</h2>
            <StarRating rating={avgRating} />
            <p>{product.price}</p>
            <Button className={btnStyles.detailsBtn} to={`/products/${product.id}`}>Acheter</Button>
        </li>
    )
}
