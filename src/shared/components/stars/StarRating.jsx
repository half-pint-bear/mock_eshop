import React from "react";
import styles from "./StarRating.module.css";

export default function StarRating({ rating = 0, align = "center" }) {
    const maxStars = 5;

    const alignmentClass =
        align === "left" ? styles.leftAlign :
            align === "center" ? styles.centerAlign :
                "";

    return (
        <div className={`${styles.starRating} ${alignmentClass}`}>
            {[...Array(maxStars)].map((_, i) => {
                const fill = rating >= i + 1 ? "full"
                    : rating >= i + 0.5 ? "half"
                        : "empty";
                return <Star key={i} type={fill} />;
            })}
        </div>
    );
}

function Star({ type }) {
    switch (type) {
        case "full":
            return <span className={styles.starFull}>★</span>;
        case "half":
            return <span className={styles.starHalf}>★</span>;
        default:
            return <span className={styles.starEmpty}>☆</span>;
    }
}
