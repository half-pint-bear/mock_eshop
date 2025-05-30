import { useEffect, useState } from "react";
import { apiClientGet } from "../../../services/apiClient.jsx";

let _cache = null;

export default function useCategories() {
    const [categories, setCategories] = useState(_cache || []);
    const [loading, setLoading] = useState(!_cache);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (_cache) return; // avoid call if cache available

        const fetchCategories = async () => {
            try {
                const res = await apiClientGet("/products/categories");
                setCategories(res.data);
                _cache = res.data; // cache memory storing
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    function getNameBySlug(slug) {
        const category = categories.find(cat => cat.slug === slug);
        return category?.name || "Unknown category";
    }

    return { categories, loading, error, getNameBySlug };
}
