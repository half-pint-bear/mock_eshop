import {useEffect, useState} from "react";
import {apiClientGet} from "../../../services/apiClient.jsx";

export default function useHomeData() {
    const [categories, setCategories] = useState([]);
    const [newProducts, setNewsProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, newRes] = await Promise.all([
                    apiClientGet("/products/categories"),
                    apiClientGet("/products"),
                ]);
                setCategories(arbitraryCategorySelection(catRes.data));
                setNewsProducts(newRes);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    function arbitraryCategorySelection (categories)  {
        const slugs = ['vehicle', 'laptops', 'sports-accessories', 'home-decoration'];

        return categories.filter(category => slugs.includes(category.slug));
    }
    return {categories, newProducts, error, loading};
}
