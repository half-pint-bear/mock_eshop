import { useEffect, useState } from "react";
import { apiClientGet } from "../../../services/apiClient.jsx";

export default function useProductsPagination(page = 1, limit = 25, selectedCategories = []) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const skip = (page - 1) * limit;
        setLoading(true);

        const fetchProducts = async () => {
            try {
                let allProducts = [];

                if (selectedCategories.length === 0) {
                    const response = await apiClientGet(`/products?limit=${limit}&skip=${skip}`);
                    setProducts(response.data.products);
                    setTotal(response.data.total);
                    return;
                }

                if (selectedCategories.length === 1) {
                    const response = await apiClientGet(`/products/category/${selectedCategories[0]}?limit=${limit}&skip=${skip}`);
                    setProducts(response.data.products);
                    setTotal(response.data.total);
                    return;
                }

                // Plusieurs catégories : on récupère tout, puis on pagine côté client
                const allResponses = await Promise.all(
                    selectedCategories.map(cat =>
                        apiClientGet(`/products/category/${cat}`)
                    )
                );

                allResponses.forEach(res => {
                    allProducts.push(...res.data.products);
                });

                // Élimine les doublons (au cas où des produits se répètent)
                const uniqueProducts = Array.from(
                    new Map(allProducts.map(p => [p.id, p])).values()
                );

                const paginated = uniqueProducts.slice(skip, skip + limit);
                setProducts(paginated);
                setTotal(uniqueProducts.length);
            } catch (error) {
                console.error("Erreur lors du chargement des produits :", error);
                setProducts([]);
                setTotal(0);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, limit, selectedCategories]);

    const totalPages = Math.ceil(total / limit);

    return { products, loading, totalPages };
}
