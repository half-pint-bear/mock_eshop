import styles from './PriceWrapper.module.css';

export default function PriceWrapper({product, align="center"}) {

    const alignmentClass = align === "left" ? styles["align-left"] : styles["align-center"];

    return (
        <div className={`${styles.priceWrapper}  ${alignmentClass}`}>
            <span className={styles.originalPrice}>{product.price} €</span>
            <span className={styles.discount}>-{Math.round(product.discountPercentage)}%</span>
            <span className={styles.finalPrice}>
            {(product.price * (1 - product.discountPercentage / 100)).toFixed(2)} €
        </span>
        </div>
    )
}
