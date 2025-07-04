import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "../styles/TopProductCarousel.module.css";
import btnStyles from '../../../shared/components/buttons/Button.module.css'
import Button from "../../../shared/components/buttons/Button.jsx";
import StarRating from "../../../shared/components/stars/StarRating.jsx";
import PriceWrapper from "../../../shared/components/price/PriceWrapper.jsx";

export default function TopProductCarousel({ products = [] }) {
    // Embedded Embla hook
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className={styles.embla}>
            <div className={styles.embla__viewport} ref={emblaRef}>
                <div className={styles.embla__container}>
                    {products.map((product) => (
                        <div className={styles.embla__slide} key={product.id}>
                            <div className={styles.productCard}>
                                <img src={product.thumbnail} alt={product.title} />
                                <h3>{product.title}</h3>
                                <StarRating rating={product.rating} />
                                {product.discountPercentage ? (
                                    <PriceWrapper product={product} /> )
                                     : (
                                    <p className={styles.finalPrice}>{product.price} €</p>
                                )}
                                <Button className={btnStyles.detailsBtn} to={`/products/${product.id}`}>Détails</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={scrollPrev} className={`${styles.embla__button} ${styles.embla__buttonPrev}`}>‹</button>
            <button onClick={scrollNext} className={`${styles.embla__button} ${styles.embla__buttonNext}`}>›</button>`
        </div>
    );
}
