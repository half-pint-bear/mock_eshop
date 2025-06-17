import styles from "../styles/CartPreview.module.css";
import { useCart } from "../../../contexts/CartContext.jsx";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPreview({ open, closePreview }) {
    const { cart } = useCart();
    const dropdownRef = useRef();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((sum, item) => {
        const priceAfterDiscount = item.discountPercentage
            ? item.price * (1 - item.discountPercentage / 100)
            : item.price;
        return sum + priceAfterDiscount * item.quantity;
    }, 0).toFixed(2);

    const unitPrice = (item) => item.price.toFixed(2);

    const priceDisplay = (item) => {
        if (item.discountPercentage && item.discountPercentage > 0) {
            const discountedPrice = (item.price * (1 - item.discountPercentage / 100)).toFixed(2);
            return (
                <>
                    <span style={{ textDecoration: "line-through", marginRight: 6 }}>
                        {unitPrice(item)}€
                    </span>
                    <span style={{ color: "red", fontWeight: "bold", marginRight: 6 }}>
                        {discountedPrice}€
                    </span>
                    <span style={{ color: "#888", fontSize: "0.85rem" }}>
                        (-{item.discountPercentage}%)
                    </span>
                </>
            );
        }
        return `${unitPrice(item)}€`;
    };

    const handleCartDisplayOnClick = () => {
        closePreview();
        navigate("/cart");
    };

    if (!open) return null;

    return (
        <div className={styles.cartContainer} ref={dropdownRef}>
            <div className={styles.dropdown}>
                <div className={styles.itemList}>
                    {cart.length === 0 ? (
                        <p className={styles.empty}>Votre panier est vide.</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className={styles.item}>
                                <img src={item.thumbnail} alt={item.title} />
                                <div className={styles.itemInfo}>
                                    <strong>{item.title}</strong>
                                    <span>
                                        {item.quantity} x {priceDisplay(item)}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {cart.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.total}>Total : {totalPrice} €</div>
                        <button
                            className={styles.viewCartBtn}
                            onClick={handleCartDisplayOnClick}
                        >
                            Voir le panier
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
