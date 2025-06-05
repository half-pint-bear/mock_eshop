import {useEffect, useState} from "react";
import {apiClientGet} from "../../../services/apiClient.jsx";

export default function useProductsPagination(page = 1, limit = 25) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const skip = (page - 1) * limit;
        setLoading(true);

        const fetchProducts = async () => {
            const response = await apiClientGet(`/products?page=${page}&skip=${skip}`);
            setProducts(response.data.products);
            setTotal(response.data.total);
            setLoading(false);
        }

        fetchProducts();
    }, [page, limit]);

    const totalPages = Math.ceil(total / limit);

    return {products, loading, totalPages};
}
