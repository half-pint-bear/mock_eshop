import { useParams } from "react-router-dom";
import { useState } from "react";
import useProductById from "./hooks/useProductById";
import Loader from "../../shared/components/loader/Loader.jsx";
import styles from './styles/SingleProductPage.module.css';
import btnStyles from '../../shared/components/buttons/Button.module.css'
import StarRating from "../../shared/components/stars/StarRating.jsx";
import Button from "../../shared/components/buttons/Button.jsx";
import {useCart} from "../../contexts/CartContext.jsx";


export default function SingleProductPage() {
    const { id } = useParams();
    const { product } = useProductById(id);
    const [mainImage, setMainImage] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCart();
    const handleAddToCart = () => {
        addToCart(product, quantity); //Send product & quantity to context
    }
    if (!product) return <Loader />;

    const handleDecrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    return (
        <div className={styles.productPage}>
            <div className={styles.productGallery}>
                <div className={styles.productThumbnails}>
                    {product.images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={`mini-${i}`}
                            className={`${styles.thumbImg} ${mainImage === img ? styles.active : ''}`}
                            onClick={() => setMainImage(img)}
                        />
                    ))}
                </div>
                <div className={styles.mainThumbnail}>
                    <img src={mainImage || product.thumbnail} alt={product.title} />
                </div>
            </div>
            <div className={styles.productDetails}>
                <h1>{product.title}</h1>
                <p className={styles.brand}>{product.brand}</p>
                <div><StarRating rating={product.rating} /> ({product.reviews?.length ?? 0} reviews)</div>
                <p className={styles.price}>${product.price}</p>
                <p className={styles.description}>{product.description}</p>

                <div className={styles.cartActions}>
                    <div className={styles.quantitySelector}>
                        <button onClick={handleDecrease}>−</button>
                        <span>{quantity}</span>
                        <button onClick={handleIncrease}>+</button>
                    </div>
                    <Button className={btnStyles.detailsBtn} onClick={handleAddToCart}>Add to Cart</Button>
                </div>
            </div>
        </div>
    );
}
