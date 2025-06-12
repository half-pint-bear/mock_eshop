import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import Loader from "../../shared/components/loader/Loader.jsx";
import styles from "./styles/AccountPage.module.css";

export default function AccountPage() {
    const { user } = useContext(AuthContext);

    if (!user) return <Loader />;

    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <img
                    src={user.image}
                    alt="Avatar"
                    className={styles.avatar}
                />
                <h2>{user.firstName} {user.lastName}</h2>
                <p className={styles.role}>{user.username}</p>
            </div>

            <div className={styles.info}>
                <h3>Informations personnelles</h3>
                <div><strong>Email :</strong> {user.email}</div>
                <div><strong>Téléphone :</strong> {user.phone}</div>

                <div className={styles.addressCard}>
                    <h4>Adresse</h4>
                    {user.address?.address && user.address?.city && user.address?.postalCode ? (
                        <p>
                            {user.address.address}<br />
                            {user.address.postalCode} {user.address.city}<br />
                            {user.address.state}
                        </p>
                    ) : (
                        <p className={styles.placeholder}>Adresse non renseignée</p>
                    )}
                </div>
            </div>
        </div>
    );
}
