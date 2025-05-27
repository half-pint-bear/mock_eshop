import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "../styles/TopProductCarousel.module.css";

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
                                <p>{product.price} €</p>
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
