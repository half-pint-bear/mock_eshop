import styles from "../styles/ProductCard.module.css";
import StarRating from "../../../shared/components/stars/StarRating.jsx";
import Button from "../../../shared/components/buttons/Button.jsx";
import btnStyles from "../../../shared/components/buttons/Button.module.css";
import PriceWrapper from "../../../shared/components/price/PriceWrapper.jsx";

export default function ProductCard({ product }) {
    return (
        <div className={styles.card}>
            <img
                src={product.thumbnail}
                alt={product.title}
                className={styles.thumbnail}
            />
            <h4 className={styles.title}>{product.title}</h4>
            <StarRating rating={product.rating} />
            {product.discountPercentage ? (
                <PriceWrapper product={product} />
            ) :
            <p className={styles.price}>{product.price} €</p>
            }
            <Button className={btnStyles.showMoreBtn} to={`/products/${product.id}`} >Découvrir</Button>
        </div>
    );
}
