import {useEffect, useState} from "react";
import {apiClientGet} from "../../../services/apiClient.jsx";

export default function useCategoryBySlug(slug) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        try {
            const res = apiClientGet(`/products/category/${slug}`);
            setProducts(res.data.products);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, [slug]);

    return {products, loading};
}
