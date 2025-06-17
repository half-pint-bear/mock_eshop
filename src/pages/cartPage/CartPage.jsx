import { useState, useEffect, useContext } from "react";
import { useCart } from "../../contexts/CartContext.jsx";
import styles from "./styles/CartPage.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import LoginModal from "../../features/auth/LoginModal.jsx";
import { X } from "lucide-react";

export default function CartPage() {
    const { cart, removeFromCart, clearCart, updateCart } = useCart();
    const [localCart, setLocalCart] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setLocalCart(cart.map(item => ({ ...item })));
    }, [cart]);

    const handleQuantityChange = (id, delta) => {
        setLocalCart(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const handleUpdateCart = () => {
        localCart.forEach(item => {
            updateCart(item.id, item.quantity);
        });
    };

    const unitPriceWithDiscount = (item) => {
        if (item.discountPercentage && item.discountPercentage > 0) {
            return (item.price * (1 - item.discountPercentage / 100)).toFixed(2);
        }
        return item.price.toFixed(2);
    };

    const totalPrice = localCart.reduce((sum, item) => {
        const priceAfterDiscount = item.discountPercentage && item.discountPercentage > 0
            ? item.price * (1 - item.discountPercentage / 100)
            : item.price;
        return sum + priceAfterDiscount * item.quantity;
    }, 0).toFixed(2);

    if (cart.length === 0)
        return <p className={styles.emptyMessage}>Votre panier est vide</p>;

    return (
        <div className={styles.cart}>
            <h2>Votre panier</h2>

            <div className={`${styles.cartList} ${styles.cartHeader}`}>
                <span>Produit</span>
                <span>Prix unitaire</span>
                <span>Réduction</span>
                <span>Quantité</span>
                <span>Total</span>
                <span></span>
            </div>

            {localCart.map(item => (
                <div key={item.id} className={styles.cartList}>
                    <div className={`${styles.cartCell} ${styles.cartProduct}`}>
                        <img src={item.thumbnail} alt={item.title} className={styles.thumbnail} />
                        <span className={styles.productInfo}>{item.title}</span>
                    </div>

                    <div className={styles.cartCell}>
                        {item.price.toFixed(2)} €
                    </div>

                    <div className={styles.cartCell}>
                        {item.discountPercentage && item.discountPercentage > 0 ? `${(item.discountPercentage).toFixed(0)} %` : "—"}
                    </div>

                    <div className={`${styles.cartCell} ${styles.quantityControls}`}>
                        <button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, +1)}>+</button>
                    </div>

                    <div className={`${styles.cartCell} ${styles.cartTotal}`}>
                        {(unitPriceWithDiscount(item) * item.quantity).toFixed(2)} €
                    </div>

                    <div className={`${styles.cartCell} ${styles.removeCell}`}>
                        <button
                            className={styles.removeBtn}
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Retirer l'article"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            ))}

            <div className={styles.actionsRow}>
                <button
                    className={styles.continueBtn}
                    onClick={() => navigate("/")}
                >
                    Poursuivre la navigation
                </button>

                <button
                    className={styles.clearCartBtn}
                    onClick={clearCart}
                >
                    Vider le panier
                </button>
            </div>

            <div className={styles.summaryBox}>
                <p><strong>Total d'articles :</strong> {localCart.reduce((sum, i) => sum + i.quantity, 0)}</p>
                <p><strong>Total :</strong> {totalPrice} €</p>
                <button
                    onClick={() => {
                        handleUpdateCart();
                        if (user) {
                            navigate("/checkout");
                        } else {
                            alert("Vous devez être connecté pour valider votre panier.");
                            setShowModal(true);
                        }
                    }}
                >
                    Passer la commande
                </button>
            </div>

            {showModal && (
                <LoginModal
                    onClose={() => setShowModal(false)}
                    redirectTo="/checkout"
                />
            )}
        </div>
    );
}
