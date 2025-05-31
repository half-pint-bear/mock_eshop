import {useCart} from "../../contexts/CartContext.jsx";
import styles from "./styles/CartPage.module.css";

export default function CartPage() {
    const {cart, removeFromCart, clearCart, totalItems} = useCart();

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    if( cart.length === 0 )
        return <p>Votre panier est vide, sale pauvre</p>;

    return (
        <div className={styles.cart}>
            <h2>Votre panier</h2>
            <ul className={styles.cartList}>
                {cart.map((item) => (
                    <li key={item.id} className={styles.cartItem}>
                        <div>
                            <strong>{item.title}</strong>
                            <p>Quantité : {item.quantity}</p>
                            <p>Prix unitaire : {item.price} €</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)}>Retirer</button>
                    </li>
                ))}
            </ul>
            <hr />
            <p><strong>Total d'articles :</strong> {totalItems}</p>
            <p><strong>Total :</strong> {totalPrice} €</p>
            <button onClick={clearCart}>Vider le panier</button>
        </div>
    );
}
