import styles from "../styles/CartPreview.module.css";
import { useCart } from "../../../contexts/CartContext.jsx";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function CartPreview() {
    const { cart } = useCart();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();
    const navigate = useNavigate();

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    ).toFixed(2);

    // Fermer si clic hors composant
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    //Hide cart on click before redirection
    const handleCartDisplayOnClick = () => {
        setOpen(false);
        navigate("/cart");
    };

    return (
        <div className={styles.cartContainer} ref={dropdownRef}>
            <button onClick={() => setOpen(!open)} className={styles.iconButton}>
                <ShoppingCart size={22} />
                {cart.length > 0 && <span className={styles.badge}>{cart.length}</span>}
            </button>

            {open && (
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
                                        <span>{item.quantity} x {item.price}€</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {cart.length > 0 && (
                        <div className={styles.footer}>
                            <div className={styles.total}>
                                Total : {totalPrice} €
                            </div>
                            <button className={styles.viewCartBtn}
                                    onClick={handleCartDisplayOnClick}>
                                Voir le panier
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
