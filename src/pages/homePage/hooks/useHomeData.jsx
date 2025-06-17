import {useEffect, useState} from "react";
import {apiClientGet} from "../../../services/apiClient.jsx";
import catImg1 from "../../../assets/womens-dresses.jpg";
import catImg2 from "../../../assets/mens-shirts.jpg";
import catImg3 from "../../../assets/tops.jpg";
import catImg4 from "../../../assets/beauty.jpg";
import catImg5 from "../../../assets/sunglasses.jpg";

export default function useHomeData() {
    const [categories, setCategories] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const cats = [
        {
            name: "Women's dresses",
            slug: "womens-dresses",
            image: catImg1,
            gridArea: "card1"
        },
        {
            name: "Men's shirts",
            slug: "mens-shirts",
            image: catImg2,
            gridArea: "card2"
        },
        {
            name: "Tops",
            slug: "tops",
            image: catImg3,
            gridArea: "card3"
        },
        {
            name: "Beauty",
            slug: "beauty",
            image: catImg4,
            gridArea: "card4"
        },
        {
            name: "Sunglasses",
            slug: "sunglasses",
            image: catImg5,
            griadArea: "card5"
        }
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topRes = await getTopProducts();
                setCategories(cats);
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
     * Retrieving most rated products of inner selected categories
     * @returns {Promise<products[]>}
     */
    async function getTopProducts() {
        const targetedCats = ["mens-watches", "womens-watches", "smartphones", "laptops", "vehicle" ];

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

            let avg =
                reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

            return avg >= 4.5;
        });

        // Return shuffled product array
        return filteredProducts.sort(() => Math.random() - 0.5);
    }

    return {categories, topProducts, error, loading};
}
