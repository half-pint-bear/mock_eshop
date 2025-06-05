import { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext.jsx";
import styles from "./styles/CartPage.module.css";

export default function CartPage() {
    const { cart, removeFromCart, clearCart, updateCart, totalItems } = useCart();
    const [localCart, setLocalCart] = useState([]);

    // On synchronise le panier local avec celui du contexte
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
        // Vous pouvez aussi ici déclencher une animation/toast
    };

    const totalPrice = localCart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    if (cart.length === 0)
        return <p>Votre panier est vide, sale pauvre</p>;

    return (
        <div className={styles.cart}>
            <h2>Votre panier</h2>
            <ul className={styles.cartList}>
                {localCart.map((item) => (
                    <li key={item.id} className={styles.cartItem}>
                        <div>
                            <strong>{item.title}</strong>
                            <p>Prix unitaire : {item.price} €</p>
                            <div className={styles.quantityControls}>
                                <button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>−</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item.id, +1)}>+</button>
                            </div>
                        </div>
                        <button onClick={() => removeFromCart(item.id)}>Retirer</button>
                    </li>
                ))}
            </ul>
            <hr />
            <p><strong>Total d'articles :</strong> {localCart.reduce((sum, i) => sum + i.quantity, 0)}</p>
            <p><strong>Total :</strong> {totalPrice} €</p>
            <button onClick={clearCart}>Vider le panier</button>
            <button onClick={handleUpdateCart}>Mettre à jour le panier</button>
        </div>
    );
}
