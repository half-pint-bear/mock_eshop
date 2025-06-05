import styles from "../styles/ProductCard.module.css";

export default function ProductCard({ product }) {
    return (
        <div className={styles.card}>
            <img
                src={product.thumbnail}
                alt={product.title}
                className={styles.thumbnail}
            />
            <h4 className={styles.title}>{product.title}</h4>
            <p className={styles.price}>{product.price} €</p>
        </div>
    );
}
