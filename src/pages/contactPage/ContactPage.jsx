import { useState } from "react";
import styles from "./styles/ContactPage.module.css";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        consent: false,
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.message && formData.consent) {
            setSubmitted(true);
        }
    };

    return (
        <div className={styles.contactPage}>
            <h2>Contactez-nous</h2>
            {submitted ? (
                <p className={styles.confirmation}>
                    Merci pour votre message. Nous vous répondrons bientôt.
                </p>
            ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label>
                        Nom complet*
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Adresse e-mail*
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Sujet
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Message*
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="5"
                            required
                        />
                    </label>

                    <div className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="consent"
                            id="consent"
                            checked={formData.consent}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="consent">
                            J'accepte que mes données soient utilisées pour me répondre.*
                        </label>
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Envoyer
                    </button>
                </form>
            )}
        </div>
    );
}
