import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { useCart } from "../../contexts/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import styles from "./styles/CheckoutPage.module.css";

export default function CheckoutPage() {
    const { user } = useContext(AuthContext);
    const { cart } = useCart();
    const navigate = useNavigate();

    if (!user) {
        // Home redirection if user is null
        navigate("/");
        return null;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Validation de votre commande</h2>

            <div className={styles.section}>
                <h3>Informations client</h3>
                <p className={styles.info}><strong>Nom :</strong> {user.firstName} {user.lastName}</p>
                <p className={styles.info}><strong>Email :</strong> {user.email}</p>
                {user.address && (
                    <p className={styles.info}>
                        <strong>Adresse :</strong> {user.address.address}, {user.address.postalCode} {user.address.city}, {user.address.state}
                    </p>
                )}
            </div>

            <div className={styles.section}>
                <h3>Votre commande</h3>
                <ul className={styles.orderList}>
                    {cart.map(item => (
                        <li key={item.id} className={styles.orderItem}>
                            <span>{item.quantity} × {item.title}</span>
                            <span>{(item.quantity * item.price).toFixed(2)} €</span>
                        </li>
                    ))}
                </ul>
                <p className={styles.total}>Total : {total} €</p>
            </div>

            <button className={styles.confirmButton}>Confirmer la commande</button>
        </div>
    );
}
