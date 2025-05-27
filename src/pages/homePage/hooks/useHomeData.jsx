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
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    function arbitraryCategorySelection (categories)  {
        const slugs = ['womens-dresses','vehicle', 'laptops', 'sports-accessories', 'home-decoration'];

        return categories.filter(category => slugs.includes(category.slug));
    }

    async function getTopProducts() {
        const targetedCats = ["mens-watches", "womens-watches", "smartphones"];
        const filteredProducts = [];

        for (const cat of targetedCats) {
            const products = await apiClientGet("/products/category/" + cat);

            products.data.products.forEach(product => {
                const reviews = product.reviews;
                let ratings = [];
                reviews.forEach(review => {
                    ratings.push(review.rating);
                })
                let avg =  0;
                ratings.forEach(rating => {
                    avg += rating;
                });

                if(avg >= 4.5) {
                    filteredProducts.push(product);
                }
            })
        }
        return filteredProducts.sort(() => {
                return 0.5 - Math.random();
            }
        );
    }

    return {categories, newProducts: topProducts, error, loading};
}
