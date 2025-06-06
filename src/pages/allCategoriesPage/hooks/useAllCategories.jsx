import { useEffect, useState } from "react";
import { apiClientGet } from "../../../services/apiClient.jsx";

export default function useAllCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiClientGet("/products/categories")
            .then((res) => {
                const sorted = res.data
                    .sort((a, b) => a.name.localeCompare(b.name, "fr"));
                setCategories(sorted);
            })
            .catch((err) => {
                console.error("Erreur lors du chargement des catégories :", err);
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { categories, loading, error };
}
