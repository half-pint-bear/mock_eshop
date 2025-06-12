import { useContext, useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { AuthContext } from "../../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../auth/LoginModal.jsx";
import styles from "../styles/AccountIcon.module.css";

export default function AccountIcon({ className }) {
    const { user, logout } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef();

    // Hide dropdown when click anywhere
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user) {
        return (
            <div>
                <button
                    className={className}
                    aria-label="Connexion"
                    onClick={() => setShowModal(true)}
                >
                    <User size={24} />
                </button>
                {showModal && <LoginModal onClose={() => setShowModal(false)} />}
            </div>
        );
    }

    return (
        <div className={styles.container} ref={dropdownRef}>
            <button
                className={className}
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <img
                    src={user.image}
                    alt="Avatar utilisateur"
                    className={styles.avatar}
                />
            </button>

            {showDropdown && (
                <div className={styles.dropdown}>
                    <button onClick={() => { navigate("/account"); setShowDropdown(false); }}>
                        Mon compte
                    </button>
                    <button onClick={() => {
                        logout();
                        navigate("/");
                        setShowDropdown(false);
                    }}>
                        Se déconnecter
                    </button>
                </div>
            )}
        </div>
    );
}
