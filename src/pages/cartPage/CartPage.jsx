import {useState, useEffect, useContext} from "react";
import { useCart } from "../../contexts/CartContext.jsx";
import styles from "./styles/CartPage.module.css";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import LoginModal from "../../features/auth/LoginModal.jsx";

export default function CartPage() {
    const { cart, removeFromCart, clearCart, updateCart, totalItems } = useCart();
    const [localCart, setLocalCart] = useState([]);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);

    // Synchronize local cart with context cart
    useEffect(() => {
        setLocalCart(cart.map(item => ({ ...item }))); // shallow copy
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

    const totalPrice = localCart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    if (cart.length === 0)
        return <p>Votre panier est vide, sale pauvre</p>;

    return (
        <div className={styles.cart}>
            <h2>Votre panier</h2>

            {/* Tab header */}
            <div className={`${styles.cartList} ${styles.cartHeader}`}>
                <span>Produit</span>
                <span>Prix unitaire</span>
                <span>Quantité</span>
                <span>Total</span>
                <span>Action</span>
            </div>

            {/* Items lines */}
                {localCart.map(item => (
                    <div key={item.id} className={styles.cartList}>
                        {/* Produit : miniature + nom */}
                        <div className={`${styles.cartCell} ${styles.cartProduct}`}>
                            <img src={item.thumbnail} alt={item.title} className={styles.thumbnail} />
                            <span className={styles.productInfo}>{item.title}</span>
                        </div>

                        <div className={styles.cartCell}>{item.price} €</div>

                        <div className={`${styles.cartCell} ${styles.quantityControls}`}>
                            <button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>−</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleQuantityChange(item.id, +1)}>+</button>
                        </div>

                        <div className={`${styles.cartCell} ${styles.cartTotal}`}>
                            {(item.price * item.quantity).toFixed(2)} €
                        </div>

                        <div className={styles.cartCell}>
                            <button onClick={() => removeFromCart(item.id)}>Retirer</button>
                        </div>
                    </div>
                ))}

            <hr />
            <p><strong>Total d'articles :</strong> {localCart.reduce((sum, i) => sum + i.quantity, 0)}</p>
            <p><strong>Total :</strong> {totalPrice} €</p>
            <button onClick={clearCart}>Vider le panier</button>
            <button
                onClick={() => {
                    handleUpdateCart(); // met à jour les quantités
                    if (user) {
                        navigate("/checkout");
                    } else {
                        alert("Vous devez être connecté pour valider votre panier.");
                        setShowModal(true);

                    }
                }}
            >
                Valider le panier
            </button>
            {showModal && <LoginModal
                                onClose={() => setShowModal(false)}
                                redirectTo="/checkout"
                          />
            }
        </div>
    );
}
