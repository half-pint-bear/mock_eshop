import Tabs from "./Tabs";
import styles from "../styles/ProductDetails.module.css";
import {useState} from "react";
import StarRating from "../../../shared/components/stars/StarRating.jsx";

export default function ProductDetails({ reviews = [], product }) {
    const [activeTab, setActiveTab] = useState("reviews");

    const tabs = [
        {
            key: "reviews",
            label: "Reviews",
            content: reviews.length > 0 ? (
                <ul className={styles.reviewList}>
                    {reviews.map((r, i) => (
                        <li key={i} className={styles.reviewItem}>
                            <strong>Rating : {r.rating} / 5 </strong>
                            <StarRating aling="left" rating={r.rating} />
                            <strong>{r.reviewerName || "Utilisateur"}</strong>
                            <p>{r.comment}</p>
                            <p>Sent on {r.date}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun avis pour ce produit.</p>
            ),
        },
        {
            key: "specs",
            label: "Specs",
            content: product.dimensions ? (
                <ul className={styles.specList}>
                    <li><strong>Largeur</strong> : {product.dimensions.width} mm</li>
                    <li><strong>Hauteur</strong> : {product.dimensions.height} mm</li>
                    <li><strong>Profondeur</strong> : {product.dimensions.depth} mm</li>
                    <li><strong>Poids</strong> : {product.weight * 100} g</li>
                    <li><strong>Garantie</strong> : {product.warrantyInformation}</li>
                    <li><strong>Expédition</strong> : {product.shippingInformation}</li>
                </ul>
            ) : (
                <p>Aucune spécification technique disponible.</p>
            ),
        },
    ];

    return (
        <div className={styles.productDetails}>
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
}
