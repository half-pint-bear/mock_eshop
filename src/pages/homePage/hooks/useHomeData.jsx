import {useEffect, useState} from "react";
import {apiClientGet} from "../../../services/apiClient.jsx";

export default function useHomeData() {
    const [categories, setCategories] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, topRes] = await Promise.all([
                    apiClientGet("/products/categories"),
                    getTopProducts()
                ]);
                setCategories(arbitraryCategorySelection(catRes.data));
                setTopProducts(topRes);
                setLoading(false);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    /**
     * Arbitrary filtering categories
     * @param {Promise<categories[]>} categories
     * @returns {*[]}
     */
    function arbitraryCategorySelection (categories)  {
        const slugs = ['womens-dresses','mens-shirts', 'tops', 'beauty', 'sunglasses'];

        return slugs.map(slug => categories.find(category => category.slug === slug))
                    .filter(Boolean);
    }

    /**
     * Retrieving most rated products of inner selected categories
     * @returns {Promise<products[]>}
     */
    async function getTopProducts() {
        const targetedCats = ["mens-watches", "womens-watches", "smartphones"];

        // Loading categories
        const responses = await Promise.all(
            targetedCats.map(cat => apiClientGet("/products/category/" + cat))
        );

        // Put all products in unique array
        const allProducts = responses.flatMap(res => res.data.products);

        // Filter products rated >= 4.5
        const filteredProducts = allProducts.filter(product => {
            const reviews = product.reviews || [];
            if (reviews.length === 0) return false;

            const avg =
                reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

            return avg >= 4.5;
        });

        // Return shuffled product array
        return filteredProducts.sort(() => Math.random() - 0.5);
    }

    return {categories, topProducts, error, loading};
}
