import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {apiClientPost} from "../../services/apiClient.jsx";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import styles from "./LoginModal.module.css"

export default function LoginModal({onClose}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {login} = useContext(AuthContext)

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await apiClientPost("/auth/login", {
                username,
                password
            });

            const data = res.data;
            login(data.accessToken);
            onClose();
            navigate("/account");
        } catch (error) {
            console.error(error);
            setError("Wrong credentials");
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Connexion</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nom d'utilisateur"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                        required
                    />
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit">Se connecter</button>
                </form>
                <button onClick={onClose} className={styles.close}>Fermer</button>
            </div>
        </div>
    );
}
