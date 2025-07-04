import styles from "../styles/ProductCard.module.css";
import StarRating from "../../../shared/components/stars/StarRating.jsx";
import Button from "../../../shared/components/buttons/Button.jsx";
import btnStyles from "../../../shared/components/buttons/Button.module.css";
import PriceWrapper from "../../../shared/components/price/PriceWrapper.jsx";

export default function ProductCard({ product }) {

    return (
        <li key={product.id} className={styles.li}>
            <img src={product.images[0]} className={styles.img} alt={product.title} />
            <h2>{product.title}</h2>
            <StarRating align="center" rating={product.rating} />
            {product.discountPercentage ? (
                <PriceWrapper product={product} />
            ) :
                <p>{product.price}</p>
            }
            <Button className={btnStyles.detailsBtn} to={`/products/${product.id}`}>Acheter</Button>
        </li>
    )
}
